/* Exportación local. Fuente Unicode incrustada, salto de página y enlaces completos. */
export async function downloadPDF(data,filename){
 const {PDFDocument,rgb}=window.PDFLib;if(!PDFDocument||!window.fontkit)throw Error('Faltan las bibliotecas PDF del mismo origen.');
 const doc=await PDFDocument.create();doc.registerFontkit(window.fontkit);const fontBytes=await fetch(new URL('/MEC1Ciber/aula-riesgos/vendor/DejaVuSans.ttf',import.meta.url)).then(r=>{if(!r.ok)throw Error('No se pudo cargar la fuente del documento.');return r.arrayBuffer();});const font=await doc.embedFont(fontBytes,{subset:true});
 doc.setTitle(data.title);doc.setAuthor('David Pacios Izquierdo · Laboratorio docente');doc.setSubject(data.subtitle);
 const W=595.28,H=841.89,L=45,R=45,B=48;let page,y;
 const ink=rgb(.12,.18,.14),muted=rgb(.32,.39,.34),accent=rgb(.12,.38,.23);
 function addPage(){page=doc.addPage([W,H]);y=H-47;page.drawRectangle({x:L,y:H-29,width:W-L-R,height:3,color:accent});}
 function wrap(text,size,width){const lines=[];let current='';const words=String(text??'').replace(/\r/g,'').split(/(\s+)/);for(const word of words){if(word.includes('\n')){const pieces=word.split('\n');for(let i=0;i<pieces.length;i++){if(i){lines.push(current.trimEnd());current='';}current+=pieces[i];}continue;}let test=current+word;if(font.widthOfTextAtSize(test,size)<=width){current=test;continue;}if(current.trim())lines.push(current.trimEnd());current='';for(const ch of word){if(font.widthOfTextAtSize(current+ch,size)>width&&current){lines.push(current);current='';}current+=ch;}}if(current||!lines.length)lines.push(current.trimEnd());return lines;}
 function text(value,size=10,color=ink,space=5){for(const line of wrap(value,size,W-L-R)){if(y<size+48)addPage();page.drawText(line||' ',{x:L,y:y-size,font,size,color});y-=size*1.5;}y-=space;}
 addPage();text(data.title,22,accent,9);text(data.subtitle,11,muted,8);text('Documento generado el '+new Date().toISOString().slice(0,19).replace('T',' ')+' UTC',8,muted,13);
 for(const section of data.sections){if(y<100)addPage();text(section.title,13,accent,7);for(const [label,value] of section.rows){if(value===undefined||value===null||value==='')continue;if(y<80)addPage();text(label,9,muted,1);text(value,10,ink,8);}y-=8;}
 doc.getPages().forEach((p,i)=>{p.drawLine({start:{x:L,y:34},end:{x:W-R,y:34},thickness:.5,color:rgb(.7,.75,.7)});p.drawText('Ciberresiliencia · Ejercicio docente',{x:L,y:21,size:8,font,color:muted});const foot=`${i+1} / ${doc.getPageCount()}`;p.drawText(foot,{x:W-R-font.widthOfTextAtSize(foot,8),y:21,size:8,font,color:muted});});
 const blob=new Blob([await doc.save()],{type:'application/pdf'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
