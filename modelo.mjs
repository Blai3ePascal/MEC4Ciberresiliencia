/* Modelos docentes deterministas. Las cifras son supuestos de los ejercicios. */
export const fuentes = [
 {id:'NIST160',title:'NIST SP 800-160 vol. 2 rev. 1, Developing Cyber-Resilient Systems',year:'2021',url:'https://csrc.nist.gov/pubs/sp/800/160/v2/r1/final'},
 {id:'NIST34',title:'NIST SP 800-34 rev. 1, Contingency Planning Guide',year:'2010',url:'https://csrc.nist.gov/pubs/sp/800/34/r1/upd1/final'},
 {id:'CISA',title:'CISA y MS-ISAC, #StopRansomware Guide',year:'2023',url:'https://www.cisa.gov/stopransomware/ransomware-guide'},
 {id:'NIST55',title:'NIST SP 800-55 vol. 1, Measurement Guide for Information Security',year:'2024',url:'https://csrc.nist.gov/pubs/sp/800/55/v1/final'},
 {id:'NIST86',title:'NIST SP 800-86, Guide to Integrating Forensic Techniques into Incident Response',year:'2006',url:'https://csrc.nist.gov/pubs/sp/800/86/final'},
 {id:'AWS',title:'AWS, Default instance warmup for Auto Scaling',year:'Documentación de producto',url:'https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-default-instance-warmup.html'},
 {id:'NIST92',title:'NIST SP 800-92, Guide to Computer Security Log Management',year:'2006',url:'https://csrc.nist.gov/pubs/sp/800/92/final'}
];
export const labs={
 1:{title:'Protocolo de defensa',tag:'SERVICIO Y DEPENDENCIAS',subtitle:'Faro Norte necesita seguir despachando pedidos.',time:35,repo:'MEC1Ciberresiliencia',description:'Seis incidencias. Cambia una dependencia, ensaya la recuperación y compara el resultado con el objetivo del negocio.'},
 2:{title:'Laboratorio del CIO',tag:'ARQUITECTURA Y RECUPERACIÓN',subtitle:'La capacidad del sistema tiene límites concretos.',time:40,repo:'MEC2Ciberresiliencia',description:'Seis pruebas de carga y fallo. Diseña la arquitectura, observa el servicio y comprueba la recuperación.'},
 3:{title:'Mesa del CISO',tag:'MEDICIÓN Y PRESUPUESTO',subtitle:'Un año de decisiones con un libro de cuentas abierto.',time:40,repo:'MEC3Ciberresiliencia',description:'Doce meses. Cada mes eliges una medida, interpretas un indicador y dejas una decisión documentada.'},
 4:{title:'Detective digital',tag:'PREPARACIÓN FORENSE',subtitle:'La evidencia necesita origen, tiempo y custodia.',time:35,repo:'MEC4Ciberresiliencia',description:'Tres expedientes. Preserva los originales, documenta el desfase y entrega un informe que admita sus límites.'}
};
export const defenseControls=[
 {id:'link',name:'Enlace independiente',cost:3,desc:'Operador, canalización y terminación diferentes. Conmutación ensayada en 8 min.'},
 {id:'manual',name:'Despacho manual',cost:2,desc:'Personal ensayado y lista local de pedidos. Mantiene 60 % del servicio a partir del minuto 10.'},
 {id:'identity',name:'Acceso de emergencia',cost:3,desc:'Identidades locales controladas, MFA y registro separado. Habilitación en 15 min.'},
 {id:'backup',name:'Copia aislada y probada',cost:4,desc:'Punto limpio de hace 12 min. Restauración 20 min y validación 10 min.'},
 {id:'segment',name:'Segmentación',cost:2,desc:'Separa estaciones de oficina y almacén. Reduce el alcance del cifrado.'},
 {id:'config',name:'Configuración independiente',cost:2,desc:'Reserva de configuración fuera de la cuenta principal. Reposición en 20 min.'}
];
export const defenseCases=[
 {id:'FN-01',title:'El directorio dejó de autenticar',fault:'identity',initial:0,ordinary:100,dataLoss:0,evidence:['08:00. El directorio central no emite sesiones nuevas.','08:03. Base de datos y red siguen operativas. Las sesiones antiguas vencen en cinco minutos.','El portal depende del mismo directorio que el acceso remoto del proveedor.'],actions:[['emergency','Activar acceso de emergencia'],['manual','Pasar al despacho manual'],['reboot','Reiniciar los servidores']],best:['identity','manual'],lesson:'Una reserva de servidores comparte el fallo si depende del mismo sistema de identidad.'},
 {id:'FN-02',title:'Dos contratos, una zanja',fault:'network',initial:0,ordinary:120,dataLoss:0,evidence:['09:10. Una excavadora corta la canalización de entrada.','Las dos ofertas comerciales utilizan la misma fibra en el último tramo.','El servicio de radio independiente tiene un ensayo de conmutación de 8 min.'],actions:[['independent','Conmutar por el enlace independiente'],['duplicate','Activar el segundo contrato de fibra'],['manual','Pasar al despacho manual']],best:['link','manual'],lesson:'La independencia de las rutas determina si la redundancia aguanta una causa común.'},
 {id:'FN-03',title:'Cifrado en las estaciones',fault:'database',initial:0,ordinary:95,dataLoss:90,evidence:['11:00. Las estaciones de oficina muestran una nota de rescate.','Hay actividad de escritura masiva sobre la carpeta compartida.','La copia conectada comparte credenciales de administración. La copia aislada conserva un punto limpio.'],actions:[['clean','Aislar y restaurar en entorno limpio'],['connected','Restaurar la copia conectada'],['manual','Pasar al despacho manual']],best:['backup','segment','manual'],lesson:'Recuperar exige un punto de restauración comprobado y un entorno en el que la amenaza ya esté contenida.'},
 {id:'FN-04',title:'La reserva también recibió el cambio',fault:'config',initial:0,ordinary:85,dataLoss:0,evidence:['13:00. Un cambio de DNS impide localizar el portal.','Principal y reserva descargaron la misma configuración incorrecta.','La versión anterior tiene firma verificada y una copia externa al despliegue.'],actions:[['restoreConfig','Reponer la configuración independiente'],['replica','Conmutar a la réplica actual'],['manual','Pasar al despacho manual']],best:['config','manual'],lesson:'Una réplica puede reproducir el error. La reversión necesita una versión conocida y un camino de administración disponible.'},
 {id:'FN-05',title:'La cuenta del proveedor está bloqueada',fault:'identity',initial:20,ordinary:110,dataLoss:0,evidence:['16:10. El proveedor pierde acceso a su panel.','La aplicación y el soporte usan el mismo proveedor de identidad.','La intervención requiere credenciales de emergencia guardadas fuera de ese proveedor.'],actions:[['emergency','Activar acceso de emergencia'],['replica','Levantar otra instancia en la misma cuenta'],['manual','Pasar al despacho manual']],best:['identity','manual'],lesson:'La recuperación tiene sus propias dependencias. Hay que poder operar cuando el control central falla.'},
 {id:'FN-06',title:'La copia existe. ¿Sirve?',fault:'database',initial:0,ordinary:130,dataLoss:90,evidence:['18:00. Un borrado lógico se ha replicado al secundario.','El inventario dice que se realizan copias. La última restauración probada es la aislada.','El negocio acepta perder como máximo 15 min de pedidos.'],actions:[['clean','Restaurar la copia aislada y validar'],['replica','Conmutar a la réplica actual'],['connected','Restaurar sin comprobar el punto']],best:['backup','manual'],lesson:'El RPO habla de datos que se pueden perder. El RTO habla del tiempo para volver al nivel acordado.'}
];
export function defense(c,choices,action,validation=true){
 const has=x=>choices.includes(x);let recovery=c.ordinary,loss=c.dataLoss,capacity=c.initial,reason='La acción elegida no elimina la dependencia que está fallando.';
 if(action==='emergency'&&has('identity')&&c.fault==='identity'){recovery=15;reason='El acceso independiente permite operar sin el directorio afectado.';}
 if(action==='independent'&&has('link')&&c.fault==='network'){recovery=8;reason='La vía independiente evita la canalización cortada.';}
 if(action==='restoreConfig'&&has('config')&&c.fault==='config'){recovery=20;reason='La versión conocida se repone por un canal independiente.';}
 if(action==='clean'&&has('backup')&&c.fault==='database'){recovery=(has('segment')?10:25)+20+(validation?10:0);loss=12;reason=has('segment')?'La segmentación limita el alcance. Se restaura el punto limpio y se comprueba la operación.':'Contener el alcance consume 25 min antes de restaurar y validar.';}
 if(action==='manual'&&has('manual')){capacity=60;reason='El despacho manual mantiene 60 % desde el minuto 10. La recuperación completa sigue pendiente.';}
 const trusted=!(c.fault==='database'&&action==='clean'&&!validation);
 const series=Array.from({length:13},(_,i)=>{let t=i*10;return {t,service:t>=recovery?100:action==='manual'&&has('manual')&&t>=10?60:c.initial};});
 const acceptable=trusted&&recovery<=60&&loss<=15;
 const lostEquivalent=series.slice(0,-1).reduce((s,p)=>s+(100-p.service)/100*10,0);
 return {recovery,loss,capacity,reason,trusted,acceptable,series,lostEquivalent,cost:defenseControls.filter(x=>has(x.id)).reduce((s,x)=>s+x.cost,0),lesson:c.lesson};
}
export const archCases=[
 {id:'AR-01',title:'Campaña de pedidos',legit:700,attack:0,type:'peak',evidence:'La demanda sube de 300 a 700 solicitudes/s en el minuto 5. El autoescalado necesita 3 min para preparar capacidad.'},
 {id:'AR-02',title:'Tráfico hostil a la aplicación',legit:400,attack:600,type:'attack',evidence:'Llegan 400 solicitudes/s legítimas y 600 hostiles. El filtrado estricto bloquea un 10 % de las legítimas en este modelo.'},
 {id:'AR-03',title:'El enlace se llena antes del servidor',legit:400,attack:2000,type:'volumetric',evidence:'El enlace admite 1.200 solicitudes/s equivalentes. El filtrado local actúa después del enlace. La mitigación del proveedor actúa antes.'},
 {id:'AR-04',title:'Cae una zona',legit:600,attack:0,type:'zone',evidence:'En el minuto 5 falla la zona A durante 20 min. Una segunda máquina en esa misma zona comparte el fallo.'},
 {id:'AR-05',title:'El borrado llega a la réplica',legit:300,attack:0,type:'delete',evidence:'El borrado lógico se replica al secundario. La copia limpia requiere 15 min de preparación, 20 min de carga y una prueba funcional.'},
 {id:'AR-06',title:'El control también cae',legit:600,attack:0,type:'control',evidence:'Una incidencia de identidad impide administrar ambas zonas. La operación de emergencia tiene que estar preparada fuera de esa dependencia.'}
];
export const archDefaults={nodes:2,zones:1,filter:'balanced',autoscale:false,edge:false,identity:false,backup:60,restoreTest:true,recovery:30};
export function architecture(c,a){
 const filter={off:{block:0,fp:0},balanced:{block:.8,fp:.02},strict:{block:.97,fp:.10}}[a.filter];
 const cost=Number(a.nodes)*2+(a.zones===2?3:0)+(a.autoscale?2:0)+(a.edge?4:0)+(a.identity?3:0)+(Number(a.backup)<=15?3:1)+(a.restoreTest?2:0);
 const points=[];let lastFailure=0;
 for(let t=0;t<=60;t++){
  const event=t>=5;const legit=event?c.legit:300;const rawAttack=event?c.attack:0;
  const afterEdge=rawAttack*(a.edge?.1:1);const linkFactor=Math.min(1,1200/(legit+afterEdge));
  const good=legit*linkFactor*(1-filter.fp);const bad=afterEdge*linkFactor*(1-filter.block);
  let nodes=Number(a.nodes)+(a.autoscale&&t>=8?2:0);
  if(c.type==='zone'&&event&&t<25) nodes=a.zones===2?Math.floor(nodes/2):0;
  if(c.type==='control'&&event&&t<(a.identity?20:45))nodes=0;
  const recovery=5+15+20+(a.restoreTest?10:0);
  if(c.type==='delete'&&event&&t<recovery)nodes=0;
  const capacity=nodes*250;const proportion=Math.min(1,capacity/(good+bad||1));const completed=good*proportion;
  const success=completed/legit*100;const trusted=!(c.type==='delete'&&!a.restoreTest&&event);
  if(event&&(success<95||!trusted))lastFailure=t;
  points.push({t,demand:legit,hostile:rawAttack,completed,capacity,success,trusted});
 }
 const sample=points.slice(5);const requests=sample.reduce((s,p)=>s+p.demand,0),completed=sample.reduce((s,p)=>s+p.completed,0);
 const returnAt=points.find(p=>p.t>=5&&p.t>lastFailure)?.t;
 const observed=returnAt===undefined?null:returnAt-5;
 const loss=c.type==='delete'?Number(a.backup):0;
 const pass=observed!==null&&observed<=Number(a.recovery)&&loss<=15&&a.restoreTest;
 return {cost,points,success:completed/requests*100,observed,loss,pass,units:'solicitudes/s',note:c.type==='volumetric'?'El filtro de aplicación recibe el tráfico después del enlace. La mitigación previa cambia el cuello de botella.':c.type==='zone'?'Distribuir nodos entre zonas deja capacidad superviviente. Revisa también identidad y configuración.':c.type==='delete'?'La réplica reproduce el borrado. La copia preserva un punto anterior. El tiempo incluye validación.':'La capacidad se añade después del tiempo de preparación. El filtrado también puede rechazar trabajo legítimo.'};
}
export const months=[
 {name:'Enero',event:'Inventario sin dueño',base:30,theme:'inventory',evidence:'Dos servicios críticos carecen de responsable de restauración. La prueba solo cubría una máquina.',task:'Definir el alcance del indicador',question:'¿Qué mide la disponibilidad mensual del servicio?',options:['Porcentaje de máquinas encendidas','Minutos con servicio acordado / minutos del periodo','Cantidad de copias realizadas'],correct:1},
 {name:'Febrero',event:'Copia que nunca volvió',base:100,theme:'backup',evidence:'El trabajo de copia termina en verde. El ensayo de restauración descubre una clave que falta.',task:'Interpretar un verde',question:'¿Qué evidencia acredita recuperación?',options:['El correo que confirma la copia','El pago de la licencia','Restauración y prueba de negocio dentro del objetivo'],correct:2},
 {name:'Marzo',event:'El proveedor tropieza',base:150,theme:'independence',evidence:'Principal y reserva usan el mismo proveedor de identidad. Ambos quedan inaccesibles.',task:'Medir la dependencia común',question:'¿Qué hipótesis hay que probar?',options:['Que la reserva funciona con identidad principal caída','Que hay dos contratos firmados','Que el servidor nuevo es más rápido'],correct:0},
 {name:'Abril',event:'Cambio que llegó a todos',base:90,theme:'change',evidence:'Un cambio de configuración llega simultáneamente al principal y a su reserva.',task:'Poner un límite al cambio',question:'¿Qué medida permite aprender antes de ampliar?',options:['Cambiar toda la flota para ser rápidos','Despliegue gradual con prueba y reversión','Añadir otra media anual'],correct:1},
 {name:'Mayo',event:'Ruido de madrugada',base:40,theme:'visibility',evidence:'Una cola de alertas mezcla actividad normal y anomalías. La detección tarda 25 minutos.',task:'Separar tiempos',question:'¿Qué representa el tiempo de detección?',options:['Desde comienzo del incidente hasta identificación','Desde la restauración hasta el fin de mes','Duración de una compra'],correct:0},
 {name:'Junio',event:'Turno con media plantilla',base:70,theme:'exercise',evidence:'El procedimiento necesita una persona que está de vacaciones y no tiene sustituto.',task:'Hacer el procedimiento ejecutable',question:'¿Qué vuelve útil el procedimiento?',options:['Más páginas sin probar','Que lo firme solo el proveedor','Un suplente autorizado que lo ensaye'],correct:2},
 {name:'Julio',event:'La mediana tapa la cola',base:120,theme:'backup',evidence:'Los tiempos de recuperación medidos son 10, 12, 13, 15 y 90 minutos. El objetivo es 30 minutos.',task:'Interpretar cinco ensayos',question:'¿Qué concluyes?',options:['La mediana de 13 min prueba cumplimiento de todos','Un ensayo incumple y necesita análisis','Se descarta el 90 porque molesta'],correct:1},
 {name:'Agosto',event:'Vuelve el fallo común',base:160,theme:'independence',evidence:'La alternativa vuelve a fallar por compartir canal de administración. La prueba anterior no incluyó ese escenario.',task:'Delimitar la evidencia',question:'¿Qué debe declarar el informe?',options:['Los escenarios y dependencias que cubrió la prueba','Solo el color verde','Que la arquitectura es invulnerable'],correct:0},
 {name:'Septiembre',event:'Mes corto, cálculo largo',base:55,theme:'visibility',evidence:'El servicio es continuo. Septiembre tiene 30 días y hubo 60 min de indisponibilidad.',task:'Mantener denominador y ventana',question:'¿Qué denominador usarías?',options:['365 días','720 minutos','43.200 minutos del mes'],correct:2},
 {name:'Octubre',event:'Nueva automatización',base:110,theme:'change',evidence:'Una regla generada por IA aísla estaciones legítimas. El despliegue por fases limita el alcance.',task:'Medir el efecto en el negocio',question:'¿Qué contrasta la utilidad del cambio?',options:['La longitud del texto generado','Impacto real, falsas alarmas y prueba de reversión','La cantidad de prompts'],correct:1},
 {name:'Noviembre',event:'Ejercicio sin participantes clave',base:80,theme:'exercise',evidence:'El ensayo técnico termina. La función de negocio no validó que el servicio pudiera retomarse.',task:'Cerrar con evidencia del negocio',question:'¿Qué falta?',options:['La aceptación del servicio por su responsable','Más capturas del servidor verde','Cambiar el nombre del simulacro'],correct:0},
 {name:'Diciembre',event:'Presupuesto del próximo año',base:140,theme:'inventory',evidence:'El año deja incidentes de duración desigual y medidas cuyo alcance es distinto.',task:'Decidir la próxima mejora',question:'¿Qué comparación es defendible?',options:['Equipos encendidos frente a incidentes','Dos medias con alcances diferentes','Misma ventana, servicio y fórmula, con límites documentados'],correct:2}
];
export const investments=[
 {id:'inventory',name:'Inventario y responsables',cost:2,opex:0,desc:'Identifica servicio, dueño y dependencias de recuperación.'},
 {id:'backup',name:'Copia probada',cost:5,opex:1,desc:'Ensaya restauración del servicio y conserva la evidencia.'},
 {id:'independence',name:'Alternativa independiente',cost:6,opex:1,desc:'Prueba acceso alternativo y dependencias comunes.'},
 {id:'change',name:'Despliegue gradual',cost:3,opex:1,desc:'Aplica primero a una parte, observa y conserva reversión.'},
 {id:'visibility',name:'Medición de servicio',cost:3,opex:1,desc:'Observa el resultado que recibe el usuario y el tiempo de detección.'},
 {id:'exercise',name:'Ensayo con suplente',cost:3,opex:0,desc:'Comprueba procedimiento, permisos y aceptación del negocio.'}
];
export function campaignStep(state,choice,answer,note=''){
 const i=state.records.length;if(i>=12)return state;
 const m=months[i],credit=i%3===0?16:0;let cash=state.cash+credit;let owned=[...state.owned];
 if(choice.startsWith('suspend:'))owned=owned.filter(x=>x!==choice.slice(8));
 const item=investments.find(x=>x.id===choice);let purchase=0;
 if(item&&!owned.includes(item.id)) {if(cash<item.cost)throw Error('Presupuesto insuficiente para esta compra.');cash-=item.cost;purchase=item.cost;owned.push(item.id);}
 const opex=investments.filter(x=>owned.includes(x.id)).reduce((s,x)=>s+x.opex,0);
 if(cash<opex)throw Error('La compra deja sin fondos para mantener las medidas este mes. Elige esperar o una medida con menor coste.');
 cash-=opex;const match=owned.includes(m.theme);const down=Math.round(m.base*(match?.35:1));
 const days=[31,28,31,30,31,30,31,31,30,31,30,31][i],total=days*24*60;const availability=(total-down)/total*100;
 const record={month:m.name,event:m.event,choice:item?.name||(choice.startsWith('suspend:')?'Suspender '+investments.find(x=>x.id===choice.slice(8))?.name:'Sin compra nueva'),credit,purchase,opex,cash,down,total,availability,match,answer,correct:answer===m.correct,note};
 return {...state,cash,owned,records:[...state.records,record]};
}
export function campaignSummary(s){const total=s.records.reduce((a,x)=>a+x.total,0),down=s.records.reduce((a,x)=>a+x.down,0);return {total,down,availability:total?(total-down)/total*100:100,correct:s.records.filter(x=>x.correct).length};}
export const forensicCases=[
 {id:'E-101',title:'La exportación inesperada',source:'Copia recibida de Operaciones',reference:'El monitor independiente registra una autenticación a las 08:00:00 UTC. El directorio la registra a las 08:01:30 UTC. Desfase medido +90 s.',offset:90,need:['L2','L3','L4'],limit:'La IP y la cuenta observadas requieren verificación. Estos registros no identifican por sí solos a una persona.',logs:[
  {id:'L1',system:'MON',time:'07:59:40',line:'GET /status 200 prueba_disponibilidad',meaning:'Sonda de disponibilidad prevista.'},
  {id:'L2',system:'AUTH',time:'08:01:30',line:'login cuenta=svc_export origen=192.0.2.44 MFA=ausente',meaning:'Uso de cuenta de servicio desde un origen que exige revisión.'},
  {id:'L3',system:'DATA',time:'08:00:20',line:'export job=891 filas=18400 cuenta=svc_export',meaning:'Exportación a relacionar con autorización y ticket de negocio.'},
  {id:'L4',system:'NET',time:'08:00:45',line:'egress origen=DATA destino=198.51.100.23 bytes=42100333',meaning:'Transferencia saliente. Falta confirmar el contenido y la autorización.'},
  {id:'L5',system:'AUTH',time:'08:03:00',line:'logout cuenta=monitor cambio=CHG-122',meaning:'Actividad de una tarea de mantenimiento documentada.'}
 ]},
 {id:'E-102',title:'El señuelo recibió una visita',source:'Sensor de laboratorio autorizado',reference:'El reloj del sensor coincide con la referencia UTC. El escáner interno tiene autorización de 10:00 a 10:30.',offset:0,need:['L1','L3','L4'],limit:'Un acceso al señuelo puede ser una exploración autorizada o actividad hostil. La procedencia y la autorización importan.',logs:[
  {id:'L1',system:'MON',time:'10:00:00',line:'cambio=CHG-208 escaner_autorizado=192.0.2.18 ventana=30min',meaning:'Alcance de la exploración autorizada.'},
  {id:'L2',system:'AUTH',time:'10:01:00',line:'conexion origen=192.0.2.18 destino=señuelo puerto=443',meaning:'La dirección coincide con el escáner autorizado.'},
  {id:'L3',system:'AUTH',time:'10:32:40',line:'conexion origen=198.51.100.52 destino=señuelo puerto=445',meaning:'La conexión está fuera de la ventana documentada y tiene otro origen.'},
  {id:'L4',system:'NET',time:'10:32:45',line:'alerta sensor=H-02 intento_autenticacion cuenta=admin',meaning:'Actividad que requiere correlación y autorización antes de atribuir intención.'}
 ]},
 {id:'E-103',title:'Memoria y continuidad',source:'Estación de empaquetado en servicio',reference:'El reloj AUTH está 45 s atrasado respecto a UTC. El servicio está aislado en una red de análisis autorizada y la operación dispone de sustituto.',offset:-45,need:['L1','L2','L3'],limit:'La adquisición depende del riesgo, la autoridad y el estado del sistema. La volatilidad orienta la prioridad sin sustituir esa decisión.',logs:[
  {id:'L1',system:'MON',time:'14:00:00',line:'sustituto=activo aislamiento=confirmado autorizacion=IR-17',meaning:'Condiciones de seguridad y autorización de la adquisición.'},
  {id:'L2',system:'AUTH',time:'13:59:30',line:'proceso=memory_capture operador=análisis evidencia=MEM-17',meaning:'Captura autorizada de memoria volátil. Documentar herramienta y alcance.'},
  {id:'L3',system:'DATA',time:'14:02:00',line:'copia_evidencia=DISK-17 herramienta=adquisicion modo=solo_lectura',meaning:'Obtención posterior de una copia del soporte y registro de la herramienta.'},
  {id:'L4',system:'NET',time:'14:03:00',line:'sonda=monitorizacion resultado=ok',meaning:'Seguimiento del sustituto. No acredita la identidad del actor del incidente.'}
 ]}
];
export function correctedTime(time,offset){const a=time.split(':').map(Number);let total=a[0]*3600+a[1]*60+a[2]-offset;total=(total+86400)%86400;return [Math.floor(total/3600),Math.floor(total%3600/60),total%60].map(n=>String(n).padStart(2,'0')).join(':');}
export function forensicReview(c,s){
 const checks=[
  {label:'Original preservado',pass:!!s.hash,why:'El SHA-256 se calcula sobre los bytes exactos del expediente. Se conserva el original descargable.'},
  {label:'Tiempo documentado',pass:Number(s.offset)===c.offset,why:'La vista analítica aplica el desfase medido. El fichero original mantiene su hora.'},
  {label:'Evidencia y contexto',pass:c.need.every(x=>s.selected.includes(x)),why:'La selección incluye los registros que sostienen la hipótesis y su contexto.'},
  {label:'Transferencia trazable',pass:!!s.custody?.length&&s.custody.every(x=>x.from&&x.to&&x.purpose&&x.time),why:'La custodia registra origen, receptor, momento, finalidad y huella.'},
  {label:'Límites de la conclusión',pass:s.conclusion==='bounded',why:c.limit},
  {label:'Informe razonado',pass:(s.note||'').trim().length>=35,why:'Describe el hallazgo y una comprobación pendiente con tus palabras.'}
 ];return {checks,complete:checks.every(x=>x.pass)};
}
export function originalBytes(c){return c.logs.map(x=>`${x.id}\t${x.system}\t2026-11-27T${x.time}Z\t${x.line}`).join('\n')+'\n';}
export function initialState(id){return {v:3,id,name:'',note:'',index:0,history:[],choices:[],action:'',validation:true,architecture:{...archDefaults},cash:0,owned:[],records:[],selected:[],offset:0,hash:'',custody:[],conclusion:'',caseStates:{}};}
