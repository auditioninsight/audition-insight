export interface Orchestra {
  id: string;
  name: string;
}

export interface CountryDataRaw {
  country: string;
  code: string;
  orchestras: Orchestra[];
}

export const orchestras: CountryDataRaw[] = [
  {
    country: "Germany",
    code: "de",
    orchestras: [
      { id: "sinfonieorchester-aachen", name: "Sinfonieorchester Aachen" },
      { id: "philharmonisches-orchester-altenburg-gera", name: "Philharmonisches Orchester Altenburg-Gera" },
      { id: "erzgebirgische-philharmonie-aue", name: "Erzgebirgische Philharmonie Aue" },
      { id: "augsburger-philharmoniker", name: "Augsburger Philharmoniker" },
      { id: "sachsische-blaserphilharmonie", name: "Sächsische Bläserphilharmonie" },
      { id: "bad-reichenhaller-philharmoniker", name: "Bad Reichenhaller Philharmoniker" },
      { id: "baden-badener-philharmonie", name: "Baden-Badener Philharmonie" },
      { id: "bamberger-symphoniker", name: "Bamberger Symphoniker" },
      { id: "sorbische-kammerphilharmonie", name: "Sorbische Kammerphilharmonie" },
      { id: "staatskapelle-berlin", name: "Staatskapelle Berlin" },
      { id: "konzerthausorchester-berlin", name: "Konzerthausorchester Berlin" },
      { id: "orchester-der-komischen-oper-berlin", name: "Orchester der Komischen Oper Berlin" },
      { id: "berliner-philharmoniker", name: "Berliner Philharmoniker" },
      { id: "deutsches-symphonie-orchester-berlin", name: "Deutsches Symphonie-Orchester Berlin" },
      { id: "orchester-der-deutschen-oper-berlin", name: "Orchester der Deutschen Oper Berlin" },
      { id: "rundfunk-sinfonieorchester-berlin", name: "Rundfunk-Sinfonieorchester Berlin" },
      { id: "bielefelder-philharmoniker", name: "Bielefelder Philharmoniker" },
      { id: "bochumer-symphoniker", name: "Bochumer Symphoniker" },
      { id: "leipziger-symphonieorchester", name: "Leipziger Symphonieorchester" },
      { id: "beethoven-orchester-bonn", name: "Beethoven Orchester Bonn" },
      { id: "brandenburger-symphoniker", name: "Brandenburger Symphoniker" },
      { id: "staatsorchester-braunschweig", name: "Staatsorchester Braunschweig" },
      { id: "bremer-philharmoniker", name: "Bremer Philharmoniker" },
      { id: "philharmonisches-orchester-bremerhaven", name: "Philharmonisches Orchester Bremerhaven" },
      { id: "robert-schumann-philharmonie", name: "Robert-Schumann-Philharmonie" },
      { id: "philharmonisches-orchester-coburg", name: "Philharmonisches Orchester Coburg" },
      { id: "philharmonisches-orchester-cottbus", name: "Philharmonisches Orchester Cottbus" },
      { id: "staatsorchester-darmstadt", name: "Staatsorchester Darmstadt" },
      { id: "anhaltische-philharmonie-dessau", name: "Anhaltische Philharmonie Dessau" },
      { id: "symphonieorchester-detmold", name: "Symphonieorchester Detmold" },
      { id: "dortmunder-philharmoniker", name: "Dortmunder Philharmoniker" },
      { id: "sachsische-staatskapelle-dresden", name: "Sächsische Staatskapelle Dresden" },
      { id: "dresdner-philharmonie", name: "Dresdner Philharmonie" },
      { id: "orchester-der-staatsoperette-dresden", name: "Orchester der Staatsoperette Dresden" },
      { id: "duisburger-philharmoniker", name: "Duisburger Philharmoniker" },
      { id: "dusseldorfer-symphoniker", name: "Düsseldorfer Symphoniker" },
      { id: "philharmonisches-orchester-erfurt", name: "Philharmonisches Orchester Erfurt" },
      { id: "essener-philharmoniker", name: "Essener Philharmoniker" },
      { id: "frankfurter-opern-und-museumsorchester", name: "Frankfurter Opern- und Museumsorchester" },
      { id: "hr-sinfonieorchester", name: "hr-Sinfonieorchester" },
      { id: "philharmonisches-staatsorchester-hamburg", name: "Philharmonisches Staatsorchester Hamburg" },
      { id: "hamburger-symphoniker", name: "Hamburger Symphoniker" },
      { id: "ndr-elbphilharmonie-orchester", name: "NDR Elbphilharmonie Orchester" },
      { id: "niedersachsisches-staatsorchester-hannover", name: "Niedersächsisches Staatsorchester Hannover" },
      { id: "ndr-radiophilharmonie", name: "NDR Radiophilharmonie" },
      { id: "badische-staatskapelle-karlsruhe", name: "Badische Staatskapelle Karlsruhe" },
      { id: "staatsorchester-kassel", name: "Staatsorchester Kassel" },
      { id: "gurzenich-orchester-koln", name: "Gürzenich-Orchester Köln" },
      { id: "wdr-sinfonieorchester", name: "WDR Sinfonieorchester" },
      { id: "wdr-funkhausorchester", name: "WDR Funkhausorchester" },
      { id: "gewandhausorchester-leipzig", name: "Gewandhausorchester Leipzig" },
      { id: "orchester-der-musikalischen-komodie-leipzig", name: "Orchester der Musikalischen Komödie Leipzig" },
      { id: "mdr-sinfonieorchester", name: "MDR Sinfonieorchester" },
      { id: "munchner-philharmoniker", name: "Münchner Philharmoniker" },
      { id: "bayerisches-staatsorchester", name: "Bayerisches Staatsorchester" },
      { id: "munchner-symphoniker", name: "Münchner Symphoniker" },
      { id: "symphonieorchester-des-bayerischen-rundfunks", name: "Symphonieorchester des Bayerischen Rundfunks" },
      { id: "munchner-rundfunkorchester", name: "Münchner Rundfunkorchester" },
      { id: "staatsphilharmonie-nurnberg", name: "Staatsphilharmonie Nürnberg" },
      { id: "nurnberger-symphoniker", name: "Nürnberger Symphoniker" },
      { id: "staatsorchester-stuttgart", name: "Staatsorchester Stuttgart" },
      { id: "stuttgarter-philharmoniker", name: "Stuttgarter Philharmoniker" },
      { id: "swr-symphonieorchester", name: "SWR Symphonieorchester" },
      { id: "deutsche-radio-philharmonie", name: "Deutsche Radio Philharmonie Saarbrücken-Kaiserslautern" },
      { id: "ansbacher-kammerorchester", name: "Ansbacher Kammerorchester" },
      { id: "ascher-mitteldeutsches-kammerorchester", name: "Ascher Mitteldeutsches Kammerorchester" },
      { id: "baden-wurttembergisches-kammerorchester", name: "Württembergisches Kammerorchester Heilbronn" },
      { id: "bergische-symphoniker", name: "Bergische Symphoniker" },
      { id: "brandenburgisches-staatsorchester-frankfurt", name: "Brandenburgisches Staatsorchester Frankfurt" },
      { id: "camerata-salzburg-deutschland", name: "Camerata Salzburg Deutschland" },
      { id: "camerata-wurzburg", name: "Camerata Würzburg" },
      { id: "chamber-orchestra-of-europe-germany", name: "Chamber Orchestra of Europe (Germany base)" },
      { id: "deutsche-kammerphilharmonie-bremen", name: "Deutsche Kammerphilharmonie Bremen" },
      { id: "deutsche-staatsphilharmonie-rheinland-pfalz", name: "Deutsche Staatsphilharmonie Rheinland-Pfalz" },
      { id: "deutsches-kammerorchester-berlin", name: "Deutsches Kammerorchester Berlin" },
      { id: "deutsches-nationaltheater-weimar-orchester", name: "Staatskapelle Weimar" },
      { id: "deutsches-symphonie-orchester-frankfurt", name: "Frankfurt Symphony Orchestra" },
      { id: "flensburg-orchester", name: "Schleswig-Holsteinisches Sinfonieorchester" },
      { id: "freiburger-barockorchester", name: "Freiburger Barockorchester" },
      { id: "goettinger-symphonie-orchester", name: "Göttinger Symphonieorchester" },
      { id: "halle-opernorchester", name: "Staatskapelle Halle" },
      { id: "heidelberger-sinfoniker", name: "Heidelberger Sinfoniker" },
      { id: "jenaer-philharmonie", name: "Jenaer Philharmonie" },
      { id: "kaiserslautern-philharmoniker", name: "Pfalztheater Kaiserslautern Orchester" },
      { id: "kiel-philharmonisches-orchester", name: "Philharmonisches Orchester Kiel" },
      { id: "koblenz-rheinische-philharmonie", name: "Rheinische Philharmonie Koblenz" },
      { id: "landestheater-detmold-orchester", name: "Orchester des Landestheaters Detmold" },
      { id: "landeskapelle-eisenach", name: "Landeskapelle Eisenach" },
      { id: "ludwigsburger-schlossfestspiele-orchester", name: "Ludwigsburger Schlossfestspiele Orchester" },
      { id: "magdeburg-philharmonisches-orchester", name: "Magdeburgische Philharmonie" },
      { id: "mainz-staatstheater-orchester", name: "Philharmonisches Staatsorchester Mainz" },
      { id: "mecklenburgische-staatskapelle-schwerin", name: "Mecklenburgische Staatskapelle Schwerin" },
      { id: "niederrheinische-sinfoniker", name: "Niederrheinische Sinfoniker" },
      { id: "norddeutsche-philharmonie-rostock", name: "Norddeutsche Philharmonie Rostock" },
      { id: "oldenburgisches-staatsorchester", name: "Oldenburgisches Staatsorchester" },
      { id: "osnabrucker-symphonieorchester", name: "Osnabrücker Symphonieorchester" },
      { id: "philharmonie-sudwestfalen", name: "Philharmonie Südwestfalen" },
      { id: "philharmonisches-orchester-freiburg", name: "Philharmonisches Orchester Freiburg" },
      { id: "philharmonisches-orchester-heilbronn", name: "Heilbronner Sinfonie Orchester" },
      { id: "philharmonisches-orchester-lubeck", name: "Philharmonisches Orchester Lübeck" },
      { id: "philharmonisches-orchester-ulm", name: "Philharmonisches Orchester Ulm" },
      { id: "rheinische-philharmonie", name: "Rheinische Philharmonie" },
      { id: "saarlandisches-staatsorchester", name: "Saarländisches Staatsorchester" },
      { id: "schlesische-philharmonie", name: "Schlesische Philharmonie Görlitz" },
      { id: "staatskapelle-schwerin", name: "Staatskapelle Schwerin" },
      { id: "staatsorchester-wiesbaden", name: "Hessisches Staatsorchester Wiesbaden" },
      { id: "theater-erfurt-orchester", name: "Theater Erfurt Philharmonisches Orchester" },
      { id: "theater-hagen-philharmoniker", name: "Philharmonisches Orchester Hagen" },
      { id: "westfalisches-sinfonieorchester", name: "Neue Philharmonie Westfalen" },
      { id: "wuppertaler-sinfonieorchester", name: "Sinfonieorchester Wuppertal" },
      { id: "zwickauer-philharmoniker", name: "Clara-Schumann-Philharmoniker" }
    ]
  },
  {
    country: "Austria",
    code: "at",
    orchestras: [
      { id: "wiener-philharmoniker", name: "Wiener Philharmoniker" },
      { id: "wiener-symphoniker", name: "Wiener Symphoniker" },
      { id: "orf-radio-symphonieorchester-wien", name: "ORF Radio-Symphonieorchester Wien" },
      { id: "wiener-kammerorchester", name: "Wiener Kammerorchester" },
      { id: "wiener-hofburg-orchester", name: "Wiener Hofburg Orchester" },
      { id: "wiener-johann-strauss-orchester", name: "Wiener Johann Strauss Orchester" },
      { id: "orchester-der-volksoper-wien", name: "Orchester der Volksoper Wien" },
      { id: "tonkunstler-orchester-niederosterreich", name: "Tonkünstler-Orchester Niederösterreich" },
      { id: "bruckner-orchester-linz", name: "Bruckner Orchester Linz" },
      { id: "buhnenorchester-linz", name: "Bühnenorchester Linz" },
      { id: "grazer-philharmoniker", name: "Grazer Philharmoniker" },
      { id: "orchester-oper-graz", name: "Orchester Oper Graz" },
      { id: "mozarteumorchester-salzburg", name: "Mozarteumorchester Salzburg" },
      { id: "salzburger-landestheater-orchester", name: "Salzburger Landestheater Orchester" },
      { id: "tiroler-symphonieorchester-innsbruck", name: "Tiroler Symphonieorchester Innsbruck" },
      { id: "symphonieorchester-vorarlberg", name: "Symphonieorchester Vorarlberg" },
      { id: "karntner-sinfonieorchester", name: "Kärntner Sinfonieorchester" },
      { id: "vienna-state-opera-orchestra", name: "Orchester der Wiener Staatsoper" },
      { id: "klagenfurt-stadttheater-orchester", name: "Stadttheater Klagenfurt Orchester" },
      { id: "innsbruck-landestheater-orchester", name: "Tiroler Landestheater Orchester" },
      { id: "salzburg-festspielorchester", name: "Salzburger Festspiele Orchester" }
    ]
  },
  {
    country: "Spain",
    code: "es",
    orchestras: [
      { id: "orquesta-nacional-de-espana", name: "Orquesta Nacional de España" },
      { id: "orquesta-sinfonica-de-rtve", name: "Orquesta Sinfónica de RTVE" },
      { id: "orquesta-de-la-comunidad-de-madrid", name: "Orquesta de la Comunidad de Madrid" },
      { id: "orquesta-titular-del-teatro-real", name: "Orquesta Titular del Teatro Real" },
      { id: "orquestra-de-la-comunitat-valenciana", name: "Orquestra de la Comunitat Valenciana" },
      { id: "orquesta-de-valencia", name: "Orquesta de València" },
      { id: "adda-simfonica", name: "ADDA·Simfònica" },
      { id: "orquestra-simfonica-de-castello", name: "Orquestra Simfònica de Castelló" },
      { id: "orquesta-sinfonica-de-barcelona", name: "Orquesta Sinfónica de Barcelona y Nacional de Cataluña" },
      { id: "orquestra-del-liceu", name: "Orquestra Simfònica del Gran Teatre del Liceu" },
      { id: "real-orquesta-sinfonica-de-sevilla", name: "Real Orquesta Sinfónica de Sevilla" },
      { id: "orquesta-filarmonica-de-malaga", name: "Orquesta Filarmónica de Málaga" },
      { id: "orquesta-ciudad-de-granada", name: "Orquesta Ciudad de Granada" },
      { id: "orquesta-de-cordoba", name: "Orquesta de Córdoba" },
      { id: "orquesta-sinfonica-de-galicia", name: "Orquesta Sinfónica de Galicia" },
      { id: "real-filharmonia-de-galicia", name: "Real Filharmonía de Galicia" },
      { id: "euskadiko-orkestra", name: "Euskadiko Orkestra" },
      { id: "bilbao-orkestra-sinfonikoa", name: "Bilbao Orkestra Sinfonikoa" },
      { id: "orquesta-sinfonica-de-abao", name: "Orquesta Sinfónica de ABAO Bilbao Opera" },
      { id: "orquesta-sinfonica-de-castilla-y-leon", name: "Orquesta Sinfónica de Castilla y León" },
      { id: "orquesta-sinfonica-del-principado-de-asturias", name: "Orquesta Sinfónica del Principado de Asturias" },
      { id: "oviedo-filarmonia", name: "Oviedo Filarmonía" },
      { id: "orquesta-filarmonica-de-gran-canaria", name: "Orquesta Filarmónica de Gran Canaria" },
      { id: "orquesta-sinfonica-de-tenerife", name: "Orquesta Sinfónica de Tenerife" },
      { id: "orquestra-simfonica-illes-balears", name: "Orquestra Simfònica Illes Balears" },
      { id: "orquesta-sinfonica-de-la-region-de-murcia", name: "Orquesta Sinfónica de la Región de Murcia" },
      { id: "orquesta-de-extremadura", name: "Orquesta de Extremadura" },
      { id: "orquesta-sinfonica-de-navarra", name: "Orquesta Sinfónica de Navarra" },
      { id: "joven-orquesta-nacional-de-espana", name: "Joven Orquesta Nacional de España" }
    ]
  },
  {
    country: "United Kingdom",
    code: "uk",
    orchestras: [
      { id: "london-symphony-orchestra", name: "London Symphony Orchestra" },
      { id: "london-philharmonic-orchestra", name: "London Philharmonic Orchestra" },
      { id: "royal-philharmonic-orchestra", name: "Royal Philharmonic Orchestra" },
      { id: "philharmonia-orchestra", name: "Philharmonia Orchestra" },
      { id: "bbc-symphony-orchestra", name: "BBC Symphony Orchestra" },
      { id: "bbc-philharmonic", name: "BBC Philharmonic" },
      { id: "bbc-scottish-symphony-orchestra", name: "BBC Scottish Symphony Orchestra" },
      { id: "bbc-national-orchestra-of-wales", name: "BBC National Orchestra of Wales" },
      { id: "city-of-birmingham-symphony-orchestra", name: "City of Birmingham Symphony Orchestra" },
      { id: "halle-orchestra", name: "The Hallé" },
      { id: "royal-scottish-national-orchestra", name: "Royal Scottish National Orchestra" },
      { id: "scottish-chamber-orchestra", name: "Scottish Chamber Orchestra" },
      { id: "academy-of-st-martin-in-the-fields", name: "Academy of St Martin in the Fields" },
      { id: "english-chamber-orchestra", name: "English Chamber Orchestra" },
      { id: "orchestra-of-the-age-of-enlightenment", name: "Orchestra of the Age of Enlightenment" },
      { id: "aurora-orchestra", name: "Aurora Orchestra" },
      { id: "royal-northern-sinfonia", name: "Royal Northern Sinfonia" }
    ]
  },
  {
    country: "France",
    code: "fr",
    orchestras: [
      { id: "orchestre-de-paris", name: "Orchestre de Paris" },
      { id: "orchestre-national-de-france", name: "Orchestre National de France" },
      { id: "orchestre-philharmonique-de-radio-france", name: "Orchestre Philharmonique de Radio France" },
      { id: "orchestre-national-du-capitole-de-toulouse", name: "Orchestre National du Capitole de Toulouse" },
      { id: "orchestre-national-de-lyon", name: "Orchestre National de Lyon" },
      { id: "orchestre-national-de-lille", name: "Orchestre National de Lille" },
      { id: "orchestre-national-bordeaux-aquitaine", name: "Orchestre National Bordeaux Aquitaine" },
      { id: "orchestre-national-montpellier", name: "Orchestre National Montpellier Occitanie" },
      { id: "orchestre-philharmonique-de-strasbourg", name: "Orchestre Philharmonique de Strasbourg" },
      { id: "orchestre-de-chambre-de-paris", name: "Orchestre de Chambre de Paris" },
      { id: "orchestre-de-lopera-national-de-paris", name: "Orchestre de l’Opéra National de Paris" },
      { id: "orchestre-de-lopera-de-lyon", name: "Orchestre de l’Opéra de Lyon" },
      { id: "orchestre-de-lopera-de-marseille", name: "Orchestre de l’Opéra de Marseille" },
      { id: "orchestre-de-lopera-de-nice", name: "Orchestre Philharmonique de Nice" },
      { id: "orchestre-de-monte-carlo", name: "Orchestre Philharmonique de Monte-Carlo" },
      { id: "les-siecles", name: "Les Siècles" },
      { id: "ensemble-intercontemporain", name: "Ensemble Intercontemporain" },
      { id: "insula-orchestra", name: "Insula Orchestra" },
      { id: "les-musiciens-du-louvre", name: "Les Musiciens du Louvre" }
    ]
  },
  {
    country: "Italy",
    code: "it",
    orchestras: [
      { id: "orchestra-del-teatro-alla-scala", name: "Orchestra del Teatro alla Scala" },
      { id: "orchestra-dellaccademia-nazionale-di-santa-cecilia", name: "Orchestra dell'Accademia Nazionale di Santa Cecilia" },
      { id: "orchestra-sinfonica-nazionale-della-rai", name: "Orchestra Sinfonica Nazionale della RAI" },
      { id: "orchestra-del-teatro-di-san-carlo", name: "Orchestra del Teatro di San Carlo" },
      { id: "orchestra-del-maggio-musicale-fiorentino", name: "Orchestra del Maggio Musicale Fiorentino" },
      { id: "orchestra-del-teatro-la-fenice", name: "Orchestra del Teatro La Fenice" },
      { id: "orchestra-del-teatro-regio-di-torino", name: "Orchestra del Teatro Regio di Torino" },
      { id: "orchestra-del-teatro-dellopera-di-roma", name: "Orchestra del Teatro dell'Opera di Roma" },
      { id: "orchestra-del-teatro-comunale-di-bologna", name: "Orchestra del Teatro Comunale di Bologna" },
      { id: "orchestra-del-teatro-carlo-felice", name: "Orchestra del Teatro Carlo Felice" },
      { id: "orchestra-del-teatro-massimo", name: "Orchestra del Teatro Massimo Palermo" },
      { id: "orchestra-del-teatro-petruzzelli", name: "Orchestra del Teatro Petruzzelli" },
      { id: "orchestra-sinfonica-di-milano", name: "Orchestra Sinfonica di Milano" },
      { id: "orchestra-haydn", name: "Orchestra Haydn di Bolzano e Trento" },
      { id: "orchestra-della-toscana", name: "Orchestra della Toscana" },
      { id: "orchestra-sinfonica-siciliana", name: "Orchestra Sinfonica Siciliana" },
      { id: "orchestra-di-padova-e-del-veneto", name: "Orchestra di Padova e del Veneto" },
      { id: "i-pomeriggi-musicali", name: "I Pomeriggi Musicali" },
      { id: "orchestra-filarmonica-marchigiana", name: "Orchestra Filarmonica Marchigiana" }
    ]
  },
  {
    country: "Switzerland",
    code: "ch",
    orchestras: [
      { id: "tonhalle-orchester-zurich", name: "Tonhalle-Orchester Zürich" },
      { id: "orchester-opernhaus-zurich", name: "Orchester Opernhaus Zürich" },
      { id: "orchestre-de-la-suisse-romande", name: "Orchestre de la Suisse Romande" },
      { id: "orchestre-du-grand-theatre-de-geneve", name: "Orchestre du Grand Théâtre de Genève" },
      { id: "sinfonieorchester-basel", name: "Sinfonieorchester Basel" },
      { id: "kammerorchester-basel", name: "Kammerorchester Basel" },
      { id: "basel-sinfonietta", name: "Basel Sinfonietta" },
      { id: "luzerner-sinfonieorchester", name: "Luzerner Sinfonieorchester" },
      { id: "orchestre-de-chambre-de-lausanne", name: "Orchestre de Chambre de Lausanne" },
      { id: "orchestre-de-lopera-de-lausanne", name: "Orchestre de l’Opéra de Lausanne" },
      { id: "orchestra-della-svizzera-italiana", name: "Orchestra della Svizzera Italiana" },
      { id: "berner-symphonieorchester", name: "Berner Symphonieorchester" },
      { id: "musikkollegium-winterthur", name: "Musikkollegium Winterthur" },
      { id: "argovia-philharmonic", name: "argovia philharmonic" },
      { id: "orchester-st-gallen", name: "Sinfonieorchester St. Gallen" },
      { id: "basler-kammerorchester", name: "Basler Kammerorchester" },
      { id: "zurich-chamber-orchestra", name: "Zürcher Kammerorchester" },
      { id: "geneva-chamber-orchestra", name: "Orchestre de Chambre de Genève" },
      { id: "orchestra-lucerne-festival", name: "Lucerne Festival Orchestra" },
      { id: "basel-opera-orchestra", name: "Orchester Theater Basel" },
      { id: "bern-opera-orchestra", name: "Orchester Stadttheater Bern" },
      { id: "winterthur-opera-orchestra", name: "Musikkollegium Winterthur Opernorchester" },
      { id: "st-gallen-theater-orchestra", name: "Theater St. Gallen Orchester" }
    ]
  },
  {
    country: "Netherlands",
    code: "nl",
    orchestras: [
      { id: "koninklijk-concertgebouworkest", name: "Koninklijk Concertgebouworkest" },
      { id: "rotterdams-philharmonisch-orkest", name: "Rotterdams Philharmonisch Orkest" },
      { id: "radio-filharmonisch-orkest", name: "Radio Filharmonisch Orkest" },
      { id: "residentie-orkest-den-haag", name: "Residentie Orkest Den Haag" },
      { id: "philharmonie-zuidnederland", name: "Philzuid" },
      { id: "phion", name: "Phion, Orkest van Gelderland & Overijssel" },
      { id: "noord-nederlands-orkest", name: "Noord Nederlands Orkest" },
      { id: "nederlands-philharmonisch-orkest", name: "Nederlands Philharmonisch Orkest" },
      { id: "netherlands-chamber-orchestra", name: "Nederlands Kamerorkest" },
      { id: "netherlands-radio-choir-orchestra", name: "Groot Omroeporkest" },
      { id: "amsterdam-sinfonietta", name: "Amsterdam Sinfonietta" },
      { id: "dutch-national-opera-orchestra", name: "Nederlands Philharmonisch Orkest (Opera Orchestra)" },
      { id: "rotterdam-opera-orchestra", name: "Rotterdam Opera Orchestra" },
      { id: "hague-residentie-opera", name: "Residentie Orkest Opera" },
      { id: "netherlands-ballet-orchestra", name: "Het Balletorkest" }
    ]
  },
  {
    country: "Belgium",
    code: "be",
    orchestras: [
      { id: "belgian-national-orchestra", name: "Belgian National Orchestra" },
      { id: "brussels-philharmonic", name: "Brussels Philharmonic" },
      { id: "la-monnaie-symphony-orchestra", name: "La Monnaie Symphony Orchestra" },
      { id: "antwerp-symphony-orchestra", name: "Antwerp Symphony Orchestra" },
      { id: "orchestre-philharmonique-royal-de-liege", name: "Orchestre Philharmonique Royal de Liège" },
      { id: "symfonieorkest-vlaanderen", name: "Symfonieorkest Vlaanderen" },
      { id: "le-concert-olympique", name: "Le Concert Olympique" },
      { id: "brussels-chamber-orchestra", name: "Brussels Chamber Orchestra" },
      { id: "antwerp-baroque-orchestra", name: "Antwerp Baroque Orchestra" },
      { id: "opera-ballet-vlaanderen-orchestra", name: "Opera Ballet Vlaanderen Orchestra" },
      { id: "brussels-opera-orchestra", name: "Orchestre de la Monnaie" },
      { id: "flanders-opera-orchestra", name: "Vlaamse Opera Orkest" },
      { id: "wallonie-chamber-orchestra", name: "Orchestre Royal de Chambre de Wallonie" }
    ]
  },
  {
    country: "Sweden",
    code: "se",
    orchestras: [
      { id: "royal-stockholm-philharmonic-orchestra", name: "Royal Stockholm Philharmonic Orchestra" },
      { id: "swedish-radio-symphony-orchestra", name: "Swedish Radio Symphony Orchestra" },
      { id: "gothenburg-symphony-orchestra", name: "Gothenburg Symphony Orchestra" },
      { id: "royal-swedish-orchestra", name: "Royal Swedish Orchestra" },
      { id: "malmo-symphony-orchestra", name: "Malmö Symphony Orchestra" },
      { id: "norrkoping-symphony-orchestra", name: "Norrköping Symphony Orchestra" },
      { id: "helsingborg-symphony-orchestra", name: "Helsingborg Symphony Orchestra" },
      { id: "gavle-symphony-orchestra", name: "Gävle Symphony Orchestra" },
      { id: "umea-symphony-orchestra", name: "Umeå Symphony Orchestra" },
      { id: "jonkoping-sinfonietta", name: "Jönköping Sinfonietta" },
      { id: "drottningholm-baroque-ensemble", name: "Drottningholm Baroque Ensemble" },
      { id: "swedish-chamber-orchestra", name: "Swedish Chamber Orchestra" }
    ]
  },
  {
    country: "Norway",
    code: "no",
    orchestras: [
      { id: "oslo-philharmonic", name: "Oslo Philharmonic" },
      { id: "bergen-philharmonic-orchestra", name: "Bergen Philharmonic Orchestra" },
      { id: "norwegian-radio-orchestra", name: "Norwegian Radio Orchestra" },
      { id: "norwegian-national-opera-orchestra", name: "Norwegian National Opera Orchestra" },
      { id: "stavanger-symphony-orchestra", name: "Stavanger Symphony Orchestra" },
      { id: "trondheim-symphony-orchestra", name: "Trondheim Symphony Orchestra" },
      { id: "arctic-philharmonic", name: "Arctic Philharmonic" },
      { id: "kristiansand-symphony-orchestra", name: "Kristiansand Symphony Orchestra" },
      { id: "norwegian-chamber-orchestra", name: "Norwegian Chamber Orchestra" }
    ]
  },
  {
    country: "Denmark",
    code: "dk",
    orchestras: [
      { id: "danish-national-symphony-orchestra", name: "Danish National Symphony Orchestra" },
      { id: "royal-danish-orchestra", name: "Royal Danish Orchestra" },
      { id: "copenhagen-philharmonic", name: "Copenhagen Philharmonic" },
      { id: "aarhus-symphony-orchestra", name: "Aarhus Symphony Orchestra" },
      { id: "odense-symphony-orchestra", name: "Odense Symphony Orchestra" },
      { id: "aalborg-symphony-orchestra", name: "Aalborg Symphony Orchestra" },
      { id: "south-denmark-philharmonic", name: "South Denmark Philharmonic" },
      { id: "danish-chamber-orchestra", name: "Danish Chamber Orchestra" },
      { id: "concerto-copenhagen", name: "Concerto Copenhagen" }
    ]
  },
  {
    country: "Finland",
    code: "fi",
    orchestras: [
      { id: "helsinki-philharmonic-orchestra", name: "Helsinki Philharmonic Orchestra" },
      { id: "finnish-radio-symphony-orchestra", name: "Finnish Radio Symphony Orchestra" },
      { id: "finnish-national-opera-orchestra", name: "Finnish National Opera Orchestra" },
      { id: "lahti-symphony-orchestra", name: "Lahti Symphony Orchestra" },
      { id: "turku-philharmonic-orchestra", name: "Turku Philharmonic Orchestra" },
      { id: "tampere-philharmonic-orchestra", name: "Tampere Philharmonic Orchestra" },
      { id: "tapiola-sinfonietta", name: "Tapiola Sinfonietta" },
      { id: "ostrobothnian-chamber-orchestra", name: "Ostrobothnian Chamber Orchestra" },
      { id: "oulu-symphony-orchestra", name: "Oulu Symphony Orchestra" },
      { id: "kuopio-symphony-orchestra", name: "Kuopio Symphony Orchestra" },
      { id: "jyvaskyla-sinfonia", name: "Jyväskylä Sinfonia" }
    ]
  },
  {
    country: "Portugal",
    code: "pt",
    orchestras: [
      { id: "orquestra-gulbenkian", name: "Orquestra Gulbenkian" },
      { id: "orquestra-sinfonica-do-porto", name: "Orquestra Sinfónica do Porto Casa da Música" },
      { id: "orquestra-sinfonica-portuguesa", name: "Orquestra Sinfónica Portuguesa" },
      { id: "orquestra-do-teatro-nacional-sao-carlos", name: "Orquestra do Teatro Nacional de São Carlos" },
      { id: "orquestra-metropolitana-de-lisboa", name: "Orquestra Metropolitana de Lisboa" },
      { id: "orquestra-filarmonia-das-beiras", name: "Orquestra Filarmonia das Beiras" },
      { id: "orquestra-do-algarve", name: "Orquestra do Algarve" },
      { id: "orquestra-do-norte", name: "Orquestra do Norte" },
      { id: "orquestra-classica-da-madeira", name: "Orquestra Clássica da Madeira" },
      { id: "orquestra-classica-do-centro", name: "Orquestra Clássica do Centro" },
      { id: "orquestra-classica-de-espinho", name: "Orquestra Clássica de Espinho" },
      { id: "orquestra-jazz-de-matosinhos", name: "Orquestra Jazz de Matosinhos" }
    ]
  }
];

const countryMap: Record<string, string> = {
  de: "Germany",
  at: "Austria",
  ch: "Switzerland",
  it: "Italy",
  es: "Spain",
  pt: "Portugal",
  nl: "Netherlands",
  be: "Belgium",
  se: "Sweden",
  no: "Norway",
  dk: "Denmark",
  fi: "Finland",
  uk: "United Kingdom",
  fr: "France"
};

export interface CountryData {
  id: string;
  name: string;
  code: string;
  orchestras: Orchestra[];
}

export const getAllCountries = (): CountryData[] => {
  return orchestras.map(c => ({
    id: c.country.toLowerCase().replace(' ', '-'),
    name: c.country,
    code: c.code.toUpperCase(),
    orchestras: [...c.orchestras].sort((a, b) => a.name.localeCompare(b.name))
  })).sort((a, b) => a.name.localeCompare(b.name));
};

export const getCountryNameByCode = (code: string) => {
  const normalizedCode = (code || '').toLowerCase();
  const mappedCountryName = countryMap[normalizedCode] || normalizedCode;
  const country = orchestras.find(c => c.country.toLowerCase() === mappedCountryName.toLowerCase());
  return country ? country.country : mappedCountryName;
};

export interface OrchestraWithCountry extends Orchestra {
  countryCode: string;
  countryName: string;
}

export const getAllOrchestras = (): OrchestraWithCountry[] => {
  return orchestras.flatMap(c => 
    c.orchestras.map(o => ({
      ...o,
      countryCode: c.code.toLowerCase(),
      countryName: c.country
    }))
  ).sort((a, b) => a.name.localeCompare(b.name));
};

export const getOrchestrasByCountry = (code: string) => {
  const normalizedCode = (code || '').toLowerCase();
  const mappedCountryName = countryMap[normalizedCode] || normalizedCode;
  
  console.log("Selected country:", code, mappedCountryName);

  const country = orchestras.find(c => c.country.toLowerCase() === mappedCountryName.toLowerCase());
  return country ? [...country.orchestras].sort((a, b) => a.name.localeCompare(b.name)) : [];
};

export const getOrchestraById = (orchestraId: string) => {
  for (const country of orchestras) {
    const orch = country.orchestras.find(o => o.id === orchestraId.toLowerCase());
    if (orch) return { ...orch, countryId: country.country.toLowerCase().replace(' ', '-') };
  }
  return null;
};
