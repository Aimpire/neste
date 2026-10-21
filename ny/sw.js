/* Aimpire neste – service worker (#291).
   Scope = mappa der denne fila ligger (f.eks. /neste/ny/). ALDRI hub `/`, navnelenker (/asma/) eller /ledere.html.
   Unngår #258-fella: bare index/skall innenfor vår rot lagres som navigate-reserve — aldri «enhver side → ./».
   Hubens SW ignorerer allerede /^\/neste(\/|$)/ (#258); denne SW svarer bare på URL-er under ROOT.
   BUILD settes av forhandsvisning/QA til hash av app.js+innhold.json+index.html — aldri håndsatt. */
const BUILD = "7b87f508b8d8";
const CACHE = "aimpire-neste-" + BUILD;
/* Rot = katalog til sw.js (avsluttes med /). Alle cachede stier er relative til den. */
const ROOT = self.location.href.replace(/[^/]*$/, "");

const SHELL = [
  "./",
  "./index.html",
  "./app.js",
  "./innhold.json",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./ap-gradient-96.png",
  "./call.ics",
  "./skrift/archivo-80-800-latin.woff2",
  "./skrift/archivo-smal-latin.woff2",
  "./skrift/jetbrains-mono-700-latin.woff2",
  "./skrift/jetbrains-mono-latin.woff2",
  "./skrift/montserrat-latin-ext.woff2",
  "./skrift/montserrat-latin.woff2",
  "./skrift/noto-naskh-arabic-arabic.woff2",
  "./skrift/noto-nastaliq-urdu-arabic.woff2",
  "./skrift/noto-sans-devanagari-devanagari.woff2",
  "./leksjon/takt.js",
  "./leksjon/sprak.js",
  /* Uke 1 komplett offline (de fem første leksjonene) + uke 2s to første. Resten hentes når de åpnes (stale-while-revalidate),
     så installasjonen ikke koster 200 kB mobildata i Pakistan. */
  "./leksjon/pip.html",
  "./leksjon/lot.html",
  "./leksjon/spread.html",
  "./leksjon/stop.html",
  "./leksjon/risk.html",
  "./leksjon/candle.html",
  "./leksjon/leverage.html"
];
/* Lyd (/lyd/) røres IKKE: Safari Range/206 + PK-data. Offline-lyd = senere eksplisitt opt-in (#282: lyd/<id>-<lang>.mp3). */

function underRot(url){
  return url.href.indexOf(ROOT) === 0;
}

function aldriCache(url){
  return url.hostname === "docs.google.com"
      || url.hostname.indexOf("jit.si") !== -1
      || url.hostname.indexOf("jitsi") !== -1
      || /\/formResponse(\?|$)/.test(url.pathname);
}

/** Sti under ROOT uten query (f.eks. app.js, lyd/pip-ur.mp3). */
function restSti(url){
  return url.href.slice(ROOT.length).split("?")[0].replace(/^\.\//, "");
}

/** #258: bare vårt skall — ikke vilkårlig navigering (navnelenker, hub, /neste/meny). */
function erVartSkall(url){
  if(!underRot(url)) return false;
  const rest = restSti(url);
  return rest === "" || rest === "index.html";
}

/** Skall-innhold som må kunne oppdateres uten håndsatt BUILD (#258-klasse). */
function erSkrivReval(url){
  const rest = restSti(url);
  /* leksjon/: BUILD følger bare app.js+innhold.json+index.html, så en endret animasjon må revalideres her – ellers står den gamle for alltid. */
  /* paisa.json (B-055): hentes først når noen går inn i Paisa, og ligger deretter i cache som leksjonene. */
  return rest === "app.js" || rest === "innhold.json" || rest.indexOf("paisa/") === 0 || rest === "index.html" || rest.indexOf("leksjon/") === 0;
}

function staleWhileRevalidate(req){
  return caches.open(CACHE).then(function(c){
    return c.match(req).then(function(lagret){
      const nett = fetch(req).then(function(r){
        if(r && r.ok){
          c.put(req, r.clone());
          /* Hold ./ og index.html synket når index.html oppdateres. */
          try{
            const u = new URL(req.url);
            if(erVartSkall(u)){
              c.put(new URL("./index.html", ROOT).href, r.clone());
              c.put(new URL("./", ROOT).href, r.clone());
            }
          }catch(e){}
        }
        return r;
      }).catch(function(){ return lagret; });
      return lagret || nett;
    });
  });
}

self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){
    return c.addAll(SHELL.map(function(u){ return new Request(new URL(u, ROOT).href, { cache: "reload" }); }));
  }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k.indexOf("aimpire-neste-") === 0 && k !== CACHE; })
      .map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener("fetch", function(e){
  const req = e.request;
  if(req.method !== "GET") return;
  let url; try{ url = new URL(req.url); }catch(err){ return; }

  /* Hard port: utenfor vår mappe = ikke vårt (hub `/`, /asma/, /neste/meny.html, …). Etter cutover (skallet på rot) er /guide/ hubens egen SW. */
  if(!underRot(url)) return;
  if(/^guide\//.test(restSti(url))) return;
  if(aldriCache(url)) return;
  /* Lyd: aldri intercept (Range/206 i WebKit + ingen precache på mobildata). */
  if(url.pathname.indexOf("/lyd/") >= 0) return;

  /* Navigering til noe annet enn skallet (animasjons-iframe i leksjon/, /guide/, navnelenker, ledere.html):
     aldri index.html som reserve – det viste appen inni animasjonsrammen på tregt nett (målt 21.10). Leksjoner: stale-while-revalidate. */
  if(req.mode === "navigate" && !erVartSkall(url)){
    if(restSti(url).indexOf("leksjon/") === 0) e.respondWith(staleWhileRevalidate(req));
    return;
  }
  if(req.mode === "navigate"){
    e.respondWith((function(){
      const fallback = new URL("./index.html", ROOT).href;
      const nett = fetch(req).then(function(r){
        if(r && r.ok && erVartSkall(url)){
          const kopi = r.clone();
          caches.open(CACHE).then(function(c){ c.put(fallback, kopi); c.put(new URL("./", ROOT).href, r.clone()); });
        }
        return r;
      }).catch(function(){ return null; });
      return caches.match(fallback).then(function(lagret){
        const frist = new Promise(function(res){ setTimeout(function(){ res(null); }, lagret ? 800 : 6000); });
        return Promise.race([nett, frist]).then(function(r){
          return r || lagret || caches.match(new URL("./", ROOT).href).then(function(c){ return c || nett; });
        });
      });
    })());
    return;
  }

  if(erSkrivReval(url)){
    e.respondWith(staleWhileRevalidate(req));
    return;
  }

  /* Same-origin under rot: cache-first for leksjon, skrift, ikoner (ikke lyd). */
  e.respondWith(caches.match(req).then(function(c){
    if(c) return c;
    return fetch(req).then(function(r){
      if(r && r.ok){
        const kopi = r.clone();
        caches.open(CACHE).then(function(cc){ cc.put(req, kopi); });
      }
      return r;
    }).catch(function(){ return c; });
  }));
});
