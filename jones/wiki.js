(() => {
  'use strict';
  const data = window.JONES_WIKI;
  if (!data) return;
  const ui = {
    en: { title:'The meadow field guide', eyebrow:'Jones the Guinea Pig · Chronicle', intro:'Know your enemies. Meet your companions. Discover what lies beyond the siege.', alpha:'Early alpha · Game content and balancing may change.', home:'JuushGaming', privacy:'Privacy policy', search:'Search the chronicle', placeholder:'Character, attack, equipment…', language:'Language', all:'All', count:n=>`${n} ${n===1?'entry':'entries'}`, open:'Choose an entry to read more', link:'Link to this entry', empty:'No entries found. Try another word or choose All.', footer:'A field guide for curious guinea pigs.' },
    de: { title:'Das Handbuch der Wiese', eyebrow:'Jones the Guinea Pig · Chronik', intro:'Lerne deine Feinde kennen. Triff deine Begleiter. Entdecke, was hinter dem Belagerungsring liegt.', alpha:'Frühe Alpha · Inhalte und Spielbalance können sich ändern.', home:'JuushGaming', privacy:'Datenschutzerklärung', search:'Chronik durchsuchen', placeholder:'Figur, Angriff, Ausrüstung…', language:'Sprache', all:'Alle', count:n=>`${n} ${n===1?'Eintrag':'Einträge'}`, open:'Eintrag zum Weiterlesen auswählen', link:'Link zu diesem Eintrag', empty:'Keine Einträge gefunden. Versuche ein anderes Wort oder wähle Alle.', footer:'Ein Handbuch für neugierige Meerschweinchen.' },
    fr: { title:'Le guide de la prairie', eyebrow:'Jones the Guinea Pig · Chronique', intro:'Apprenez à connaître vos ennemis. Rencontrez vos compagnons. Découvrez ce qui se cache au-delà du siège.', alpha:'Première alpha · Le contenu et l’équilibrage peuvent changer.', home:'JuushGaming', privacy:'Politique de confidentialité', search:'Rechercher dans la chronique', placeholder:'Personnage, attaque, équipement…', language:'Langue', all:'Tout', count:n=>`${n} ${n===1?'entrée':'entrées'}`, open:'Choisissez une entrée pour en savoir plus', link:'Lien vers cette entrée', empty:'Aucune entrée trouvée. Essayez un autre mot ou choisissez Tout.', footer:'Un guide pour les cochons d’Inde curieux.' }
  };
  const $ = id => document.getElementById(id);
  let language='en', category='all';
  try { const saved=localStorage.getItem('jones-wiki-language'); if (ui[saved]) language=saved; } catch { /* Private browsing may disable storage. */ }
  const fold = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase(language);
  const make = (tag, text, className) => { const el=document.createElement(tag); if(text!==undefined)el.textContent=text; if(className)el.className=className; return el; };
  function render() {
    const t=ui[language], strings=data.languages[language];
    document.documentElement.lang=language;
    document.title=`${t.title} – Jones the Guinea Pig`;
    for (const [id,key] of Object.entries({eyebrow:'eyebrow',title:'title',intro:'intro',alpha:'alpha','search-label':'search','language-label':'language','read-hint':'open','footer-note':'footer','privacy-top':'privacy','privacy-bottom':'privacy'})) $(id).textContent=t[key];
    $('search').placeholder=t.placeholder; $('language').value=language;
    $('categories').replaceChildren();
    for (const id of ['all',...data.categories]) {
      const button=make('button',strings['category.'+id]); button.type='button'; button.dataset.category=id; button.setAttribute('aria-pressed',String(category===id));
      button.addEventListener('click',()=>{category=id;render();$('categories').querySelector(`[data-category="${id}"]`).focus();});
      $('categories').append(button);
    }
    const query=fold($('search').value.trim());
    const found=data.entries.filter(e=>(category==='all'||category===e.category) && fold(['title','summary','details'].map(k=>strings[`wiki.${e.id}.${k}`]).join(' ')).includes(query));
    $('count').textContent=t.count(found.length); $('entries').replaceChildren();
    for (const e of found) {
      const field=k=>strings[`wiki.${e.id}.${k}`];
      const article=make('details',undefined,'entry');article.id=e.id;
      const summary=make('summary');summary.append(make('span',strings['category.'+e.category],'category'),make('h2',field('title')),make('span',field('summary'),'summary'));
      const body=make('div',undefined,'details');body.append(make('p',field('details')));
      const link=make('a',t.link,'permalink');link.href='#'+e.id;body.append(link);article.append(summary,body);
      if(location.hash==='#'+e.id)article.open=true;
      $('entries').append(article);
    }
    if(!found.length)$('entries').append(make('p',t.empty,'empty'));
  }
  function followHash() {
    const id=decodeURIComponent(location.hash.slice(1));
    if(!data.entries.some(e=>e.id===id))return;
    category='all';$('search').value='';render();
    const entry=$(id);entry.open=true;entry.scrollIntoView({block:'start'});
  }
  $('controls').hidden=false;
  $('search').addEventListener('input',render);
  $('language').addEventListener('change',()=>{language=$('language').value;$('search').value='';try{localStorage.setItem('jones-wiki-language',language);}catch{}render();});
  window.addEventListener('hashchange',followHash);
  render();if(location.hash)followHash();
})();
