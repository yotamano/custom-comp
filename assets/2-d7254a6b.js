import{r as p,j as r}from"./index-5a655569.js";const C=()=>{const[l,u]=p.useState(0),[s,c]=p.useState(!1),[n,f]=p.useState({x:.5,y:.5}),h=p.useRef(null),i=[{id:1,url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&crop=entropy",title:"Mountain Vista",description:"Majestic peaks reaching towards endless skies"},{id:2,url:"https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&h=800&fit=crop&crop=entropy",title:"Forest Canopy",description:"Ancient trees dancing in golden light"},{id:3,url:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=800&fit=crop&crop=entropy",title:"Ocean Dreams",description:"Waves embracing pristine shores"},{id:4,url:"https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop&crop=entropy",title:"Desert Horizon",description:"Endless dunes beneath starlit skies"},{id:5,url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&crop=entropy",title:"Arctic Wonder",description:"Crystalline formations in polar silence"}],g=()=>{s||(c(!0),u(t=>(t+1)%i.length),setTimeout(()=>c(!1),800))},m=()=>{s||(c(!0),u(t=>(t-1+i.length)%i.length),setTimeout(()=>c(!1),800))},b=t=>{!s&&t!==l&&(c(!0),u(t),setTimeout(()=>c(!1),800))},y=t=>{if(h.current){const a=h.current.getBoundingClientRect(),e=(t.clientX-a.left)/a.width,o=(t.clientY-a.top)/a.height;f({x:Math.max(0,Math.min(1,e)),y:Math.max(0,Math.min(1,o))})}};p.useEffect(()=>{const t=setInterval(g,6e3);return()=>clearInterval(t)},[]);const w=(t,a)=>{const e=Math.abs(a),o=a>0?1:-1,v=`translateX(${a*100}%)`,k=1-e*.1,M=a*2,S=10-e,$=e<=2?1-e*.3:0,j=(n.x-.5)*(30-e*10)*o,I=(n.y-.5)*(20-e*5);return{transform:`${v} translateY(${I}px) translateZ(${-e*100}px) scale(${k}) rotateY(${M}deg) translateX(${j}px)`,opacity:$,zIndex:S,filter:e>0?`blur(${Math.min(e*2,8)}px) brightness(${1-e*.2})`:"none"}},d=(t,a)=>{const e=t.currentTarget;e.style.background=a?"rgba(255, 255, 255, 0.2)":"rgba(255, 255, 255, 0.1)",e.style.transform=a?"translateY(-50%) scale(1.1)":"translateY(-50%) scale(1)"},x=(t,a,e)=>{if(!e){const o=t.currentTarget;o.style.background=a?"rgba(255, 255, 255, 0.6)":"rgba(255, 255, 255, 0.3)"}};return r.jsxs("div",{ref:h,onMouseMove:y,style:{position:"relative",width:"100%",height:"100vh",overflow:"hidden",background:"linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0f0f0f 100%)",cursor:"grab",perspective:"1000px",fontFamily:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'},children:[r.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:`
          radial-gradient(circle at ${n.x*100}% ${n.y*100}%, 
            rgba(255, 255, 255, 0.03) 0%, 
            transparent 50%),
          radial-gradient(circle at ${(1-n.x)*100}% ${(1-n.y)*100}%, 
            rgba(100, 150, 255, 0.02) 0%, 
            transparent 40%)
        `,transition:"background 0.3s ease",pointerEvents:"none"}}),r.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",width:"800px",height:"500px",maxWidth:"90vw",maxHeight:"70vh",transform:"translate(-50%, -50%)",transformStyle:"preserve-3d"},children:i.map((t,a)=>{const e=a-l,o=e>i.length/2?e-i.length:e<-i.length/2?e+i.length:e;return Math.abs(o)>2?null:r.jsxs("div",{onClick:()=>b(a),style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",borderRadius:"20px",overflow:"hidden",cursor:o===0?"default":"pointer",transition:s?"all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)":"transform 0.3s ease, filter 0.3s ease",boxShadow:`
                  0 ${20+Math.abs(o)*10}px ${40+Math.abs(o)*20}px rgba(0, 0, 0, 0.4),
                  0 0 0 1px rgba(255, 255, 255, ${o===0?.1:.05}),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1)
                `,...w(a,o)},children:[r.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundImage:`url(${t.url})`,backgroundSize:"cover",backgroundPosition:`${50+(n.x-.5)*10}% ${50+(n.y-.5)*10}%`,transition:"background-position 0.3s ease",transform:`scale(${1+Math.abs(o)*.05})`}}),r.jsx("div",{style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:`
                  linear-gradient(
                    135deg, 
                    rgba(0, 0, 0, 0.1) 0%, 
                    rgba(0, 0, 0, 0.3) 70%, 
                    rgba(0, 0, 0, 0.6) 100%
                  )
                `,opacity:o===0?1:.7}}),o===0&&r.jsxs("div",{style:{position:"absolute",bottom:"40px",left:"40px",right:"40px",color:"white",transform:`translateY(${(n.y-.5)*-10}px)`,transition:"transform 0.3s ease"},children:[r.jsx("h3",{style:{fontSize:"2.5rem",fontWeight:"300",margin:"0 0 12px 0",letterSpacing:"1px",textShadow:"0 2px 20px rgba(0, 0, 0, 0.5)",animation:"fadeInUp 0.8s ease forwards"},children:t.title}),r.jsx("p",{style:{fontSize:"1.1rem",margin:0,opacity:.9,letterSpacing:"0.5px",textShadow:"0 1px 10px rgba(0, 0, 0, 0.5)",animation:"fadeInUp 0.8s 0.2s ease forwards",animationFillMode:"both"},children:t.description})]})]},t.id)})}),r.jsx("button",{onClick:m,disabled:s,"aria-label":"Previous image",style:{position:"absolute",left:"40px",top:"50%",transform:"translateY(-50%)",width:"60px",height:"60px",border:"none",borderRadius:"50%",background:"rgba(255, 255, 255, 0.1)",backdropFilter:"blur(20px)",color:"white",fontSize:"24px",cursor:s?"not-allowed":"pointer",transition:"all 0.3s ease",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.3)",opacity:s?.5:1,zIndex:100},onMouseEnter:t=>d(t,!0),onMouseLeave:t=>d(t,!1),children:"‹"}),r.jsx("button",{onClick:g,disabled:s,"aria-label":"Next image",style:{position:"absolute",right:"40px",top:"50%",transform:"translateY(-50%)",width:"60px",height:"60px",border:"none",borderRadius:"50%",background:"rgba(255, 255, 255, 0.1)",backdropFilter:"blur(20px)",color:"white",fontSize:"24px",cursor:s?"not-allowed":"pointer",transition:"all 0.3s ease",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.3)",opacity:s?.5:1,zIndex:100},onMouseEnter:t=>d(t,!0),onMouseLeave:t=>d(t,!1),children:"›"}),r.jsx("div",{style:{position:"absolute",bottom:"40px",left:"50%",transform:"translateX(-50%)",display:"flex",gap:"12px",zIndex:100},children:i.map((t,a)=>r.jsx("button",{onClick:()=>b(a),disabled:s,"aria-label":`Go to image ${a+1}`,style:{width:l===a?"40px":"12px",height:"12px",border:"none",borderRadius:"6px",background:l===a?"rgba(255, 255, 255, 0.9)":"rgba(255, 255, 255, 0.3)",cursor:s?"not-allowed":"pointer",transition:"all 0.3s ease",backdropFilter:"blur(10px)",opacity:s?.5:1},onMouseEnter:e=>x(e,!0,l===a),onMouseLeave:e=>x(e,!1,l===a)},a))}),r.jsx("style",{children:`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `})]})};export{C as default};
