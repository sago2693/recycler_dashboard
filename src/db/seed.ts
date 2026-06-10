import type { Database } from "sql.js";

const CATEGORY_MAP: Record<string, string> = {
  Plastic: "c1",
  Paper: "c2",
  Glass: "c3",
  Metal: "c4",
  Organic: "c5",
};

export function seed(db: Database): void {
  // ── Categories ────────────────────────────────────────────────────────────
  db.run(`INSERT INTO categories (id, name_es) VALUES
    ('c1','Plástico'),('c2','Papel'),('c3','Vidrio'),('c4','Metal'),('c5','Orgánico')`);

  // ── Monthly trends ────────────────────────────────────────────────────────
  const trends = [
    ["Jun 2025", 2000, 540], ["Jul 2025", 2340, 630], ["Aug 2025", 2560, 690],
    ["Sep 2025", 2180, 590], ["Oct 2025", 2640, 710], ["Nov 2025", 2440, 660],
    ["Dec 2025", 2250, 610], ["Jan 2026", 2500, 680], ["Feb 2026", 2680, 720],
    ["Mar 2026", 2300, 620], ["Apr 2026", 2470, 670], ["May 2026", 3010, 810],
  ];
  for (const [month, items, weight] of trends) {
    db.run(`INSERT INTO monthly_trends (month, items, weight) VALUES (?,?,?)`, [month, items, weight]);
  }

  // ── Recyclers ─────────────────────────────────────────────────────────────
  const recyclers = [
    { id: "r1", name: "María González",       status: "active",   total_items: 4520, total_weight: 1230, active_months: 11 },
    { id: "r2", name: "Carlos Mendoza",       status: "active",   total_items: 3890, total_weight: 1050, active_months: 10 },
    { id: "r3", name: "Ana Lucía Torres",     status: "active",   total_items: 3650, total_weight:  980, active_months:  9 },
    { id: "r4", name: "Roberto Jiménez",      status: "active",   total_items: 3200, total_weight:  870, active_months:  8 },
    { id: "r5", name: "Luisa Fernanda Ríos",  status: "active",   total_items: 2980, total_weight:  810, active_months: 12 },
    { id: "r6", name: "Diego Hernández",      status: "active",   total_items: 2750, total_weight:  740, active_months:  7 },
    { id: "r7", name: "Patricia Vargas",      status: "inactive", total_items: 1820, total_weight:  490, active_months:  5 },
    { id: "r8", name: "Andrés Morales",       status: "active",   total_items: 2450, total_weight:  660, active_months:  6 },
    { id: "r9", name: "Valentina Castillo",   status: "active",   total_items: 2100, total_weight:  570, active_months:  6 },
  ];
  for (const r of recyclers) {
    db.run(
      `INSERT INTO recyclers (id,name,status,total_items,total_weight,active_months) VALUES (?,?,?,?,?,?)`,
      [r.id, r.name, r.status, r.total_items, r.total_weight, r.active_months]
    );
  }

  // ── Monthly history per recycler ──────────────────────────────────────────
  const monthlyHistories: Record<string, [string, number][]> = {
    r1: [["Jun",320],["Jul",380],["Aug",410],["Sep",350],["Oct",420],["Nov",390],["Dec",360],["Jan",400],["Feb",450],["Mar",380],["Apr",410],["May",450]],
    r2: [["Jun",290],["Jul",340],["Aug",370],["Sep",310],["Oct",380],["Nov",350],["Dec",320],["Jan",360],["Feb",400],["Mar",340],["Apr",370],["May",360]],
    r3: [["Jun",270],["Jul",310],["Aug",350],["Sep",300],["Oct",360],["Nov",330],["Dec",310],["Jan",340],["Feb",380],["Mar",320],["Apr",350],["May",330]],
    r4: [["Jun",240],["Jul",280],["Aug",300],["Sep",260],["Oct",310],["Nov",290],["Dec",270],["Jan",300],["Feb",330],["Mar",280],["Apr",310],["May",330]],
    r5: [["Jun",220],["Jul",250],["Aug",270],["Sep",230],["Oct",280],["Nov",260],["Dec",240],["Jan",270],["Feb",290],["Mar",250],["Apr",280],["May",340]],
    r6: [["Jun",200],["Jul",230],["Aug",250],["Sep",210],["Oct",260],["Nov",240],["Dec",220],["Jan",250],["Feb",270],["Mar",240],["Apr",260],["May",320]],
    r7: [["Jun",180],["Jul",210],["Aug",230],["Sep",200],["Oct",220],["Nov",190],["Dec",170],["Jan",150],["Feb",100],["Mar",80],["Apr",50],["May",40]],
    r8: [["Jun",150],["Jul",180],["Aug",200],["Sep",170],["Oct",220],["Nov",210],["Dec",190],["Jan",230],["Feb",250],["Mar",220],["Apr",240],["May",290]],
    r9: [["Jun",130],["Jul",160],["Aug",180],["Sep",150],["Oct",190],["Nov",180],["Dec",170],["Jan",200],["Feb",210],["Mar",190],["Apr",200],["May",240]],
  };
  for (const [rid, history] of Object.entries(monthlyHistories)) {
    for (const [month, items] of history) {
      db.run(`INSERT INTO recycler_monthly_history (recycler_id,month,items) VALUES (?,?,?)`, [rid, month, items]);
    }
  }

  // ── Recycler collections (recent activity) ────────────────────────────────
  const collections: [string, string, string, number, string, string][] = [
    ["a1","r1","2026-05-28",45,"Plastic","Zona Norte"],
    ["a2","r1","2026-05-26",32,"Glass","Centro"],
    ["a3","r1","2026-05-24",28,"Paper","Zona Sur"],
    ["a4","r1","2026-05-22",51,"Metal","Zona Norte"],
    ["a5","r1","2026-05-20",38,"Plastic","Centro"],
    ["a6","r1","2026-05-18",22,"Organic","Zona Este"],
    ["a7","r1","2026-05-16",40,"Paper","Zona Norte"],
    ["a8","r1","2026-05-14",35,"Glass","Zona Sur"],
    ["a9","r1","2026-05-12",29,"Plastic","Centro"],
    ["a10","r1","2026-05-10",44,"Metal","Zona Norte"],
    ["a11","r2","2026-05-29",38,"Glass","Centro"],
    ["a12","r2","2026-05-27",42,"Plastic","Zona Este"],
    ["a13","r2","2026-05-25",30,"Paper","Zona Norte"],
    ["a14","r2","2026-05-23",25,"Metal","Zona Sur"],
    ["a15","r2","2026-05-21",48,"Plastic","Centro"],
    ["a16","r2","2026-05-19",33,"Glass","Zona Norte"],
    ["a17","r2","2026-05-17",27,"Organic","Zona Este"],
    ["a18","r2","2026-05-15",41,"Paper","Zona Sur"],
    ["a19","r2","2026-05-13",36,"Plastic","Centro"],
    ["a20","r2","2026-05-11",29,"Metal","Zona Norte"],
    ["a21","r3","2026-05-28",35,"Paper","Zona Sur"],
    ["a22","r3","2026-05-26",40,"Plastic","Centro"],
    ["a23","r3","2026-05-24",28,"Glass","Zona Norte"],
    ["a24","r3","2026-05-22",33,"Metal","Zona Este"],
    ["a25","r3","2026-05-20",45,"Plastic","Zona Sur"],
    ["a26","r3","2026-05-18",30,"Paper","Centro"],
    ["a27","r3","2026-05-16",25,"Glass","Zona Norte"],
    ["a28","r3","2026-05-14",38,"Organic","Zona Este"],
    ["a29","r3","2026-05-12",42,"Plastic","Zona Sur"],
    ["a30","r3","2026-05-10",31,"Metal","Centro"],
    ["a31","r4","2026-05-29",30,"Plastic","Zona Norte"],
    ["a32","r4","2026-05-27",35,"Metal","Centro"],
    ["a33","r4","2026-05-25",28,"Glass","Zona Sur"],
    ["a34","r4","2026-05-23",40,"Paper","Zona Este"],
    ["a35","r4","2026-05-21",32,"Plastic","Zona Norte"],
    ["a36","r4","2026-05-19",25,"Organic","Centro"],
    ["a37","r4","2026-05-17",38,"Glass","Zona Sur"],
    ["a38","r4","2026-05-15",42,"Paper","Zona Este"],
    ["a39","r4","2026-05-13",29,"Plastic","Zona Norte"],
    ["a40","r4","2026-05-11",33,"Metal","Centro"],
    ["a41","r5","2026-05-30",42,"Glass","Centro"],
    ["a42","r5","2026-05-28",36,"Plastic","Zona Sur"],
    ["a43","r5","2026-05-26",30,"Paper","Zona Este"],
    ["a44","r5","2026-05-24",28,"Metal","Zona Norte"],
    ["a45","r5","2026-05-22",45,"Plastic","Centro"],
    ["a46","r5","2026-05-20",33,"Organic","Zona Sur"],
    ["a47","r5","2026-05-18",38,"Glass","Zona Este"],
    ["a48","r5","2026-05-16",27,"Paper","Zona Norte"],
    ["a49","r5","2026-05-14",40,"Plastic","Centro"],
    ["a50","r5","2026-05-12",35,"Metal","Zona Sur"],
    ["a51","r6","2026-05-29",38,"Paper","Zona Este"],
    ["a52","r6","2026-05-27",32,"Plastic","Zona Norte"],
    ["a53","r6","2026-05-25",28,"Glass","Centro"],
    ["a54","r6","2026-05-23",35,"Metal","Zona Sur"],
    ["a55","r6","2026-05-21",40,"Plastic","Zona Este"],
    ["a56","r6","2026-05-19",30,"Organic","Zona Norte"],
    ["a57","r6","2026-05-17",25,"Glass","Centro"],
    ["a58","r6","2026-05-15",42,"Paper","Zona Sur"],
    ["a59","r6","2026-05-13",33,"Plastic","Zona Este"],
    ["a60","r6","2026-05-11",29,"Metal","Zona Norte"],
    ["a61","r7","2026-04-10",15,"Paper","Zona Sur"],
    ["a62","r7","2026-04-05",12,"Plastic","Centro"],
    ["a63","r7","2026-03-28",20,"Glass","Zona Norte"],
    ["a64","r7","2026-03-20",18,"Metal","Zona Este"],
    ["a65","r7","2026-03-15",10,"Organic","Zona Sur"],
    ["a66","r7","2026-03-08",22,"Plastic","Centro"],
    ["a67","r7","2026-02-28",16,"Paper","Zona Norte"],
    ["a68","r7","2026-02-20",14,"Glass","Zona Este"],
    ["a69","r7","2026-02-12",19,"Metal","Zona Sur"],
    ["a70","r7","2026-02-05",11,"Plastic","Centro"],
    ["a71","r8","2026-05-30",35,"Metal","Zona Norte"],
    ["a72","r8","2026-05-28",40,"Plastic","Centro"],
    ["a73","r8","2026-05-26",28,"Glass","Zona Este"],
    ["a74","r8","2026-05-24",32,"Paper","Zona Sur"],
    ["a75","r8","2026-05-22",38,"Plastic","Zona Norte"],
    ["a76","r8","2026-05-20",25,"Organic","Centro"],
    ["a77","r8","2026-05-18",42,"Glass","Zona Este"],
    ["a78","r8","2026-05-16",30,"Paper","Zona Sur"],
    ["a79","r8","2026-05-14",36,"Metal","Zona Norte"],
    ["a80","r8","2026-05-12",28,"Plastic","Centro"],
    ["a81","r9","2026-05-29",30,"Plastic","Zona Sur"],
    ["a82","r9","2026-05-27",25,"Paper","Zona Este"],
    ["a83","r9","2026-05-25",35,"Glass","Centro"],
    ["a84","r9","2026-05-23",28,"Metal","Zona Norte"],
    ["a85","r9","2026-05-21",32,"Plastic","Zona Sur"],
    ["a86","r9","2026-05-19",22,"Organic","Zona Este"],
    ["a87","r9","2026-05-17",38,"Glass","Centro"],
    ["a88","r9","2026-05-15",27,"Paper","Zona Norte"],
    ["a89","r9","2026-05-13",33,"Plastic","Zona Sur"],
    ["a90","r9","2026-05-11",29,"Metal","Zona Este"],
  ];
  for (const [id, rid, date, items, cat, loc] of collections) {
    db.run(
      `INSERT INTO recycler_collections (id,recycler_id,date,items,category_id,location) VALUES (?,?,?,?,?,?)`,
      [id, rid, date, items, CATEGORY_MAP[cat], loc]
    );
  }

  // ── Producers ─────────────────────────────────────────────────────────────
  const producers = [
    { id:"p1",  name:"Restaurante El Sabor",      type:"restaurant", address:"Calle 45 #12-30, Centro",          status:"active",   monthly_volume:320, assigned:"María González",      materials:["c5","c1","c3"] },
    { id:"p2",  name:"Casa Familia Rodríguez",     type:"household",  address:"Carrera 8 #56-12, Zona Norte",     status:"active",   monthly_volume:45,  assigned:"Carlos Mendoza",      materials:["c2","c1","c4"] },
    { id:"p3",  name:"Pizzería La Italiana",       type:"restaurant", address:"Avenida Principal #78-05, Centro", status:"active",   monthly_volume:280, assigned:"Ana Lucía Torres",    materials:["c5","c2","c1"] },
    { id:"p4",  name:"Hogar Martínez",             type:"household",  address:"Calle 23 #4-18, Zona Sur",         status:"active",   monthly_volume:38,  assigned:"Roberto Jiménez",     materials:["c1","c3","c2"] },
    { id:"p5",  name:"Café de la Esquina",         type:"restaurant", address:"Carrera 15 #32-44, Zona Este",     status:"active",   monthly_volume:190, assigned:"Luisa Fernanda Ríos", materials:["c5","c2","c1"] },
    { id:"p6",  name:"Residencia López",           type:"household",  address:"Calle 67 #9-22, Zona Norte",       status:"inactive", monthly_volume:0,   assigned:"Patricia Vargas",     materials:["c2","c4"] },
    { id:"p7",  name:"Asadero Don Julio",          type:"restaurant", address:"Avenida 30 #15-60, Zona Sur",      status:"active",   monthly_volume:410, assigned:"Diego Hernández",     materials:["c5","c4","c3"] },
    { id:"p8",  name:"Apartamento Sánchez",        type:"household",  address:"Carrera 22 #41-08, Centro",        status:"pending",  monthly_volume:0,   assigned:"Andrés Morales",      materials:["c1","c2"] },
    { id:"p9",  name:"Restaurante Mar Azul",       type:"restaurant", address:"Calle 10 #25-33, Zona Este",       status:"active",   monthly_volume:350, assigned:"Valentina Castillo",  materials:["c5","c3","c1"] },
    { id:"p10", name:"Casa Familia Vargas",        type:"household",  address:"Carrera 5 #72-15, Zona Norte",     status:"active",   monthly_volume:52,  assigned:"María González",      materials:["c2","c1","c3","c4"] },
    { id:"p11", name:"Panadería El Trigal",        type:"restaurant", address:"Calle 55 #18-42, Centro",          status:"pending",  monthly_volume:0,   assigned:"Carlos Mendoza",      materials:["c5","c2","c1"] },
    { id:"p12", name:"Residencia Gutiérrez",       type:"household",  address:"Avenida 12 #63-20, Zona Sur",      status:"active",   monthly_volume:41,  assigned:"Ana Lucía Torres",    materials:["c1","c4","c2"] },
  ];
  for (const p of producers) {
    db.run(
      `INSERT INTO producers (id,name,type,address,status,monthly_volume,assigned_recycler) VALUES (?,?,?,?,?,?,?)`,
      [p.id, p.name, p.type, p.address, p.status, p.monthly_volume, p.assigned]
    );
    for (const catId of p.materials) {
      db.run(`INSERT INTO producer_materials (producer_id,category_id) VALUES (?,?)`, [p.id, catId]);
    }
  }

  // ── Routes (1 per recycler, Bogotá area) ─────────────────────────────────
  const routes: { id: string; rid: string; date: string; points: [number, number, string][] }[] = [
    {
      id: "rt1", rid: "r1", date: "2026-05-28",
      points: [[4.7110,-74.0721,"Bodega central"],[4.7145,-74.0698,"Restaurante El Sabor"],[4.7183,-74.0665,"Casa Familia Rodríguez"],[4.7162,-74.0630,"Bloque 4 - Residencias"],[4.7120,-74.0612,"Supermercado Norte"],[4.7090,-74.0650,"Punto de acopio"]],
    },
    {
      id: "rt2", rid: "r2", date: "2026-05-29",
      points: [[4.6980,-74.0850,"Parque industrial"],[4.6955,-74.0810,"Pizzería La Italiana"],[4.6930,-74.0770,"Hogar Martínez"],[4.6960,-74.0740,"Bodega Oeste"],[4.7005,-74.0760,"Café de la Esquina"],[4.7020,-74.0800,"Centro de acopio Oeste"]],
    },
    {
      id: "rt3", rid: "r3", date: "2026-05-28",
      points: [[4.7200,-74.0550,"Zona industrial Este"],[4.7230,-74.0520,"Restaurante Mar Azul"],[4.7260,-74.0490,"Apartamento Sánchez"],[4.7240,-74.0460,"Residencias Torre 7"],[4.7210,-74.0475,"Bodega Este"],[4.7185,-74.0510,"Punto verde 3"]],
    },
    {
      id: "rt4", rid: "r4", date: "2026-05-29",
      points: [[4.6850,-74.0700,"Centro sur"],[4.6880,-74.0670,"Asadero Don Julio"],[4.6910,-74.0640,"Residencia Gutiérrez"],[4.6935,-74.0610,"Bloque residencial Sur"],[4.6905,-74.0580,"Panadería El Trigal"],[4.6870,-74.0620,"Acopio Sur"]],
    },
    {
      id: "rt5", rid: "r5", date: "2026-05-30",
      points: [[4.7050,-74.0900,"Terminal Norte"],[4.7080,-74.0870,"Casa Familia Vargas"],[4.7110,-74.0840,"Edificio Laureles"],[4.7140,-74.0820,"Café del Parque"],[4.7115,-74.0790,"Residencia López"],[4.7075,-74.0820,"Acopio Norte"]],
    },
    {
      id: "rt6", rid: "r6", date: "2026-05-29",
      points: [[4.7300,-74.0650,"Universidad Central"],[4.7330,-74.0620,"Bloque comercial 1"],[4.7360,-74.0590,"Restaurante Sabores"],[4.7340,-74.0560,"Residencias Universitarias"],[4.7310,-74.0570,"Bodega Norte 2"],[4.7285,-74.0600,"Punto verde 6"]],
    },
    {
      id: "rt7", rid: "r7", date: "2026-04-10",
      points: [[4.6900,-74.0950,"Sector Occidental"],[4.6930,-74.0920,"Mercado La Floresta"],[4.6960,-74.0890,"Colegio Distrital"],[4.6940,-74.0860,"Edificio Palmeras"],[4.6910,-74.0870,"Acopio Occidente"]],
    },
    {
      id: "rt8", rid: "r8", date: "2026-05-30",
      points: [[4.7150,-74.0800,"Hub central"],[4.7180,-74.0770,"Supermercado Éxito"],[4.7210,-74.0740,"Conjunto San Luis"],[4.7235,-74.0710,"Restaurante El Patio"],[4.7215,-74.0680,"Torres Comerciales"],[4.7180,-74.0700,"Punto de entrega 8"],[4.7155,-74.0730,"Bodega Reciclaje 2"]],
    },
    {
      id: "rt9", rid: "r9", date: "2026-05-29",
      points: [[4.6800,-74.0600,"Parque El Restrepo"],[4.6830,-74.0570,"Panadería La Esperanza"],[4.6860,-74.0545,"Hogar Comunitario"],[4.6880,-74.0570,"Edificio Moderno"],[4.6855,-74.0600,"Centro comercial sur"],[4.6820,-74.0620,"Punto verde 9"]],
    },
  ];

  for (const route of routes) {
    db.run(`INSERT INTO routes (id,recycler_id,visited_at) VALUES (?,?,?)`, [route.id, route.rid, route.date]);
    route.points.forEach(([lat, lng, label], i) => {
      db.run(
        `INSERT INTO route_points (route_id,point_order,lat,lng,label) VALUES (?,?,?,?,?)`,
        [route.id, i + 1, lat, lng, label]
      );
    });
  }
}
