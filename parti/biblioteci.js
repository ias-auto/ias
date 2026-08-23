<\/script>",n=n.removeChild(n.firstChild)):typeof a.is=="string"?n=s.createElement(t,{is:a.is}):(n=s.createElement(t),t==="select"&&(s=n,a.multiple?s.multiple=!0:a.size&&(s.size=a.size))):n=s.createElementNS(n,t),n[ba]=e,n[sl]=a,Gy(n,e,!1,!1),e.stateNode=n;e:{switch(s=kp(t,a),t){case"dialog":ot("cancel",n),ot("close",n),r=a;break;case"iframe":case"object":case"embed":ot("load",n),r=a;break;case"video":case"audio":for(r=0;r<Uo.length;r++)ot(Uo[r],n);r=a;break;case"source":ot("error",n),r=a;break;case"img":case"image":case"link":ot("error",n),ot("load",n),r=a;break;case"details":ot("toggle",n),r=a;break;case"input":ox(n,a),r=Lp(n,a),ot("invalid",n);break;case"option":r=a;break;case"select":n._wrapperState={wasMultiple:!!a.multiple},r=mt({},a,{value:void 0}),ot("invalid",n);break;case"textarea":ux(n,a),r=Ip(n,a),ot("invalid",n);break;default:r=a}Ap(t,r),l=r;for(i in l)if(l.hasOwnProperty(i)){var u=l[i];i==="style"?wv(n,u):i==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&yv(n,u)):i==="children"?typeof u=="string"?(t!=="textarea"||u!=="")&&Jo(n,u):typeof u=="number"&&Jo(n,""+u):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Zo.hasOwnProperty(i)?u!=null&&i==="onScroll"&&ot("scroll",n):u!=null&&hh(n,i,u,s))}switch(t){case"input":Du(n),lx(n,a,!1);break;case"textarea":Du(n),dx(n);break;case"option":a.value!=null&&n.setAttribute("value",""+Cr(a.value));break;case"select":n.multiple=!!a.multiple,i=a.value,i!=null?ss(n,!!a.multiple,i,!1):a.defaultValue!=null&&ss(n,!!a.multiple,a.defaultValue,!0);break;default:typeof r.onClick=="function"&&(n.onclick=gd)}switch(t){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}}a&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Xt(e),null;case 6:if(n&&e.stateNode!=null)Wy(n,e,n.memoizedProps,a);else{if(typeof a!="string"&&e.stateNode===null)throw Error(oe(166));if(t=gi(ll.current),gi(Sa.current),ju(e)){if(a=e.stateNode,t=e.memoizedProps,a[ba]=e,(i=a.nodeValue!==t)&&(n=En,n!==null))switch(n.tag){case 3:$u(a.nodeValue,t,(n.mode&1)!==0);break;case 5:n.memoizedProps.suppressHydrationWarning!==!0&&$u(a.nodeValue,t,(n.mode&1)!==0)}i&&(e.flags|=4)}else a=(t.nodeType===9?t:t.ownerDocument).createTextNode(a),a[ba]=e,e.stateNode=a}return Xt(e),null;case 13:if(lt(pt),a=e.memoizedState,n===null||n.memoizedState!==null&&n.memoizedState.dehydrated!==null){if(dt&&Cn!==null&&(e.mode&1)!==0&&(e.flags&128)===0)ly(),hs(),e.flags|=98560,i=!1;else if(i=ju(e),a!==null&&a.dehydrated!==null){if(n===null){if(!i)throw Error(oe(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(oe(317));i[ba]=e}else hs(),(e.flags&128)===0&&(e.memoizedState=null),e.flags|=4;Xt(e),i=!1}else na!==null&&(ch(na),na=null),i=!0;if(!i)return e.flags&65536?e:null}return(e.flags&128)!==0?(e.lanes=t,e):(a=a!==null,a!==(n!==null&&n.memoizedState!==null)&&a&&(e.child.flags|=8192,(e.mode&1)!==0&&(n===null||(pt.current&1)!==0?Tt===0&&(Tt=3):Zh())),e.updateQueue!==null&&(e.flags|=4),Xt(e),null);case 4:return gs(),ah(n,e),n===null&&rl(e.stateNode.containerInfo),Xt(e),null;case 10:return Ph(e.type._context),Xt(e),null;case 17:return yn(e.type)&&xd(),Xt(e),null;case 19:if(lt(pt),i=e.memoizedState,i===null)return Xt(e),null;if(a=(e.flags&128)!==0,s=i.rendering,s===null)if(a)Do(i,!1);else{if(Tt!==0||n!==null&&(n.flags&128)!==0)for(n=e.child;n!==null;){if(s=_d(n),s!==null){for(e.flags|=128,Do(i,!1),a=s.updateQueue,a!==null&&(e.updateQueue=a,e.flags|=4),e.subtreeFlags=0,a=t,t=e.child;t!==null;)i=t,n=a,i.flags&=14680066,s=i.alternate,s===null?(i.childLanes=0,i.lanes=n,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=s.childLanes,i.lanes=s.lanes,i.child=s.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=s.memoizedProps,i.memoizedState=s.memoizedState,i.updateQueue=s.updateQueue,i.type=s.type,n=s.dependencies,i.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t=t.sibling;return at(pt,pt.current&1|2),e.child}n=n.sibling}i.tail!==null&&wt()>vs&&(e.flags|=128,a=!0,Do(i,!1),e.lanes=4194304)}else{if(!a)if(n=_d(s),n!==null){if(e.flags|=128,a=!0,t=n.updateQueue,t!==null&&(e.updateQueue=t,e.flags|=4),Do(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!dt)return Xt(e),null}else 2*wt()-i.renderingStartTime>vs&&t!==1073741824&&(e.flags|=128,a=!0,Do(i,!1),e.lanes=4194304);i.isBackwards?(s.sibling=e.child,e.child=s):(t=i.last,t!==null?t.sibling=s:e.child=s,i.last=s)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=wt(),e.sibling=null,t=pt.current,at(pt,a?t&1|2:t&1),e):(Xt(e),null);case 22:case 23:return Yh(),a=e.memoizedState!==null,n!==null&&n.memoizedState!==null!==a&&(e.flags|=8192),a&&(e.mode&1)!==0?(Ln&1073741824)!==0&&(Xt(e),e.subtreeFlags&6&&(e.flags|=8192)):Xt(e),null;case 24:return null;case 25:return null}throw Error(oe(156,e.tag))}function h2(n,e){switch(Th(e),e.tag){case 1:return yn(e.type)&&xd(),n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 3:return gs(),lt(vn),lt(Zt),Oh(),n=e.flags,(n&65536)!==0&&(n&128)===0?(e.flags=n&-65537|128,e):null;case 5:return zh(e),null;case 13:if(lt(pt),n=e.memoizedState,n!==null&&n.dehydrated!==null){if(e.alternate===null)throw Error(oe(340));hs()}return n=e.flags,n&65536?(e.flags=n&-65537|128,e):null;case 19:return lt(pt),null;case 4:return gs(),null;case 10:return Ph(e.type._context),null;case 22:case 23:return Yh(),null;case 24:return null;default:return null}}var Zu=!1,Yt=!1,m2=typeof WeakSet=="function"?WeakSet:Set,Me=null;function rs(n,e){var t=n.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(a){yt(n,e,a)}else t.current=null}function rh(n,e,t){try{t()}catch(a){yt(n,e,a)}}var ev=!1;function g2(n,e){if(Rp=pd,n=Yv(),Eh(n)){if("selectionStart"in n)var t={start:n.selectionStart,end:n.selectionEnd};else e:{t=(t=n.ownerDocument)&&t.defaultView||window;var a=t.getSelection&&t.getSelection();if(a&&a.rangeCount!==0){t=a.anchorNode;var r=a.anchorOffset,i=a.focusNode;a=a.focusOffset;try{t.nodeType,i.nodeType}catch{t=null;break e}var s=0,l=-1,u=-1,d=0,f=0,p=n,c=null;t:for(;;){for(var m;p!==t||r!==0&&p.nodeType!==3||(l=s+r),p!==i||a!==0&&p.nodeType!==3||(u=s+a),p.nodeType===3&&(s+=p.nodeValue.length),(m=p.firstChild)!==null;)c=p,p=m;for(;;){if(p===n)break t;if(c===t&&++d===r&&(l=s),c===i&&++f===a&&(u=s),(m=p.nextSibling)!==null)break;p=c,c=p.parentNode}p=m}t=l===-1||u===-1?null:{start:l,end:u}}else t=null}t=t||{start:0,end:0}}else t=null;for(Gp={focusedElem:n,selectionRange:t},pd=!1,Me=e;Me!==null;)if(e=Me,n=e.child,(e.subtreeFlags&1028)!==0&&n!==null)n.return=e,Me=n;else for(;Me!==null;){e=Me;try{var g=e.alternate;if((e.flags&1024)!==0)switch(e.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var v=g.memoizedProps,w=g.memoizedState,x=e.stateNode,h=x.getSnapshotBeforeUpdate(e.elementType===e.type?v:ea(e.type,v),w);x.__reactInternalSnapshotBeforeUpdate=h}break;case 3:var y=e.stateNode.containerInfo;y.nodeType===1?y.textContent="":y.nodeType===9&&y.documentElement&&y.removeChild(y.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(oe(163))}}catch(_){yt(e,e.return,_)}if(n=e.sibling,n!==null){n.return=e.return,Me=n;break}Me=e.return}return g=ev,ev=!1,g}function jo(n,e,t){var a=e.updateQueue;if(a=a!==null?a.lastEffect:null,a!==null){var r=a=a.next;do{if((r.tag&n)===n){var i=r.destroy;r.destroy=void 0,i!==void 0&&rh(e,t,i)}r=r.next}while(r!==a)}}function Ud(n,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var t=e=e.next;do{if((t.tag&n)===n){var a=t.create;t.destroy=a()}t=t.next}while(t!==e)}}function ih(n){var e=n.ref;if(e!==null){var t=n.stateNode;n.tag,n=t,typeof e=="function"?e(n):e.current=n}}function qy(n){var e=n.alternate;e!==null&&(n.alternate=null,qy(e)),n.child=null,n.deletions=null,n.sibling=null,n.tag===5&&(e=n.stateNode,e!==null&&(delete e[ba],delete e[sl],delete e[qp],delete e[QM],delete e[KM])),n.stateNode=null,n.return=null,n.dependencies=null,n.memoizedProps=null,n.memoizedState=null,n.pendingProps=null,n.stateNode=null,n.updateQueue=null}function $y(n){return n.tag===5||n.tag===3||n.tag===4}function tv(n){e:for(;;){for(;n.sibling===null;){if(n.return===null||$y(n.return))return null;n=n.return}for(n.sibling.return=n.return,n=n.sibling;n.tag!==5&&n.tag!==6&&n.tag!==18;){if(n.flags&2||n.child===null||n.tag===4)continue e;n.child.return=n,n=n.child}if(!(n.flags&2))return n.stateNode}}function sh(n,e,t){var a=n.tag;if(a===5||a===6)n=n.stateNode,e?t.nodeType===8?t.parentNode.insertBefore(n,e):t.insertBefore(n,e):(t.nodeType===8?(e=t.parentNode,e.insertBefore(n,t)):(e=t,e.appendChild(n)),t=t._reactRootContainer,t!=null||e.onclick!==null||(e.onclick=gd));else if(a!==4&&(n=n.child,n!==null))for(sh(n,e,t),n=n.sibling;n!==null;)sh(n,e,t),n=n.sibling}function oh(n,e,t){var a=n.tag;if(a===5||a===6)n=n.stateNode,e?t.insertBefore(n,e):t.appendChild(n);else if(a!==4&&(n=n.child,n!==null))for(oh(n,e,t),n=n.sibling;n!==null;)oh(n,e,t),n=n.sibling}var zt=null,ta=!1;function cr(n,e,t){for(t=t.child;t!==null;)jy(n,e,t),t=t.sibling}function jy(n,e,t){if(wa&&typeof wa.onCommitFiberUnmount=="function")try{wa.onCommitFiberUnmount(Nd,t)}catch{}switch(t.tag){case 5:Yt||rs(t,e);case 6:var a=zt,r=ta;zt=null,cr(n,e,t),zt=a,ta=r,zt!==null&&(ta?(n=zt,t=t.stateNode,n.nodeType===8?n.parentNode.removeChild(t):n.removeChild(t)):zt.removeChild(t.stateNode));break;case 18:zt!==null&&(ta?(n=zt,t=t.stateNode,n.nodeType===8?dp(n.parentNode,t):n.nodeType===1&&dp(n,t),tl(n)):dp(zt,t.stateNode));break;case 4:a=zt,r=ta,zt=t.stateNode.containerInfo,ta=!0,cr(n,e,t),zt=a,ta=r;break;case 0:case 11:case 14:case 15:if(!Yt&&(a=t.updateQueue,a!==null&&(a=a.lastEffect,a!==null))){r=a=a.next;do{var i=r,s=i.destroy;i=i.tag,s!==void 0&&((i&2)!==0||(i&4)!==0)&&rh(t,e,s),r=r.next}while(r!==a)}cr(n,e,t);break;case 1:if(!Yt&&(rs(t,e),a=t.stateNode,typeof a.componentWillUnmount=="function"))try{a.props=t.memoizedProps,a.state=t.memoizedState,a.componentWillUnmount()}catch(l){yt(t,e,l)}cr(n,e,t);break;case 21:cr(n,e,t);break;case 22:t.mode&1?(Yt=(a=Yt)||t.memoizedState!==null,cr(n,e,t),Yt=a):cr(n,e,t);break;default:cr(n,e,t)}}function nv(n){var e=n.updateQueue;if(e!==null){n.updateQueue=null;var t=n.stateNode;t===null&&(t=n.stateNode=new m2),e.forEach(function(a){var r=L2.bind(null,n,a);t.has(a)||(t.add(a),a.then(r,r))})}}function Kn(n,e){var t=e.deletions;if(t!==null)for(var a=0;a<t.length;a++){var r=t[a];try{var i=n,s=e,l=s;e:for(;l!==null;){switch(l.tag){case 5:zt=l.stateNode,ta=!1;break e;case 3:zt=l.stateNode.containerInfo,ta=!0;break e;case 4:zt=l.stateNode.containerInfo,ta=!0;break e}l=l.return}if(zt===null)throw Error(oe(160));jy(i,s,r),zt=null,ta=!1;var u=r.alternate;u!==null&&(u.return=null),r.return=null}catch(d){yt(r,e,d)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)Xy(e,n),e=e.sibling}function Xy(n,e){var t=n.alternate,a=n.flags;switch(n.tag){case 0:case 11:case 14:case 15:if(Kn(e,n),va(n),a&4){try{jo(3,n,n.return),Ud(3,n)}catch(v){yt(n,n.return,v)}try{jo(5,n,n.return)}catch(v){yt(n,n.return,v)}}break;case 1:Kn(e,n),va(n),a&512&&t!==null&&rs(t,t.return);break;case 5:if(Kn(e,n),va(n),a&512&&t!==null&&rs(t,t.return),n.flags&32){var r=n.stateNode;try{Jo(r,"")}catch(v){yt(n,n.return,v)}}if(a&4&&(r=n.stateNode,r!=null)){var i=n.memoizedProps,s=t!==null?t.memoizedProps:i,l=n.type,u=n.updateQueue;if(n.updateQueue=null,u!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&gv(r,i),kp(l,s);var d=kp(l,i);for(s=0;s<u.length;s+=2){var f=u[s],p=u[s+1];f==="style"?wv(r,p):f==="dangerouslySetInnerHTML"?yv(r,p):f==="children"?Jo(r,p):hh(r,f,p,d)}switch(l){case"input":Cp(r,i);break;case"textarea":xv(r,i);break;case"select":var c=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!i.multiple;var m=i.value;m!=null?ss(r,!!i.multiple,m,!1):c!==!!i.multiple&&(i.defaultValue!=null?ss(r,!!i.multiple,i.defaultValue,!0):ss(r,!!i.multiple,i.multiple?[]:"",!1))}r[sl]=i}catch(v){yt(n,n.return,v)}}break;case 6:if(Kn(e,n),va(n),a&4){if(n.stateNode===null)throw Error(oe(162));r=n.stateNode,i=n.memoizedProps;try{r.nodeValue=i}catch(v){yt(n,n.return,v)}}break;case 3:if(Kn(e,n),va(n),a&4&&t!==null&&t.memoizedState.isDehydrated)try{tl(e.containerInfo)}catch(v){yt(n,n.return,v)}break;case 4:Kn(e,n),va(n);break;case 13:Kn(e,n),va(n),r=n.child,r.flags&8192&&(i=r.memoizedState!==null,r.stateNode.isHidden=i,!i||r.alternate!==null&&r.alternate.memoizedState!==null||(jh=wt())),a&4&&nv(n);break;case 22:if(f=t!==null&&t.memoizedState!==null,n.mode&1?(Yt=(d=Yt)||f,Kn(e,n),Yt=d):Kn(e,n),va(n),a&8192){if(d=n.memoizedState!==null,(n.stateNode.isHidden=d)&&!f&&(n.mode&1)!==0)for(Me=n,f=n.child;f!==null;){for(p=Me=f;Me!==null;){switch(c=Me,m=c.child,c.tag){case 0:case 11:case 14:case 15:jo(4,c,c.return);break;case 1:rs(c,c.return);var g=c.stateNode;if(typeof g.componentWillUnmount=="function"){a=c,t=c.return;try{e=a,g.props=e.memoizedProps,g.state=e.memoizedState,g.componentWillUnmount()}catch(v){yt(a,t,v)}}break;case 5:rs(c,c.return);break;case 22:if(c.memoizedState!==null){rv(p);continue}}m!==null?(m.return=c,Me=m):rv(p)}f=f.sibling}e:for(f=null,p=n;;){if(p.tag===5){if(f===null){f=p;try{r=p.stateNode,d?(i=r.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=p.stateNode,u=p.memoizedProps.style,s=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=bv("display",s))}catch(v){yt(n,n.return,v)}}}else if(p.tag===6){if(f===null)try{p.stateNode.nodeValue=d?"":p.memoizedProps}catch(v){yt(n,n.return,v)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===n)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===n)break e;for(;p.sibling===null;){if(p.return===null||p.return===n)break e;f===p&&(f=null),p=p.return}f===p&&(f=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Kn(e,n),va(n),a&4&&nv(n);break;case 21:break;default:Kn(e,n),va(n)}}function va(n){var e=n.flags;if(e&2){try{e:{for(var t=n.return;t!==null;){if($y(t)){var a=t;break e}t=t.return}throw Error(oe(160))}switch(a.tag){case 5:var r=a.stateNode;a.flags&32&&(Jo(r,""),a.flags&=-33);var i=tv(n);oh(n,i,r);break;case 3:case 4:var s=a.stateNode.containerInfo,l=tv(n);sh(n,l,s);break;default:throw Error(oe(161))}}catch(u){yt(n,n.return,u)}n.flags&=-3}e&4096&&(n.flags&=-4097)}function x2(n,e,t){Me=n,Yy(n,e,t)}function Yy(n,e,t){for(var a=(n.mode&1)!==0;Me!==null;){var r=Me,i=r.child;if(r.tag===22&&a){var s=r.memoizedState!==null||Zu;if(!s){var l=r.alternate,u=l!==null&&l.memoizedState!==null||Yt;l=Zu;var d=Yt;if(Zu=s,(Yt=u)&&!d)for(Me=r;Me!==null;)s=Me,u=s.child,s.tag===22&&s.memoizedState!==null?iv(r):u!==null?(u.return=s,Me=u):iv(r);for(;i!==null;)Me=i,Yy(i,e,t),i=i.sibling;Me=r,Zu=l,Yt=d}av(n,e,t)}else(r.subtreeFlags&8772)!==0&&i!==null?(i.return=r,Me=i):av(n,e,t)}}function av(n){for(;Me!==null;){var e=Me;if((e.flags&8772)!==0){var t=e.alternate;try{if((e.flags&8772)!==0)switch(e.tag){case 0:case 11:case 15:Yt||Ud(5,e);break;case 1:var a=e.stateNode;if(e.flags&4&&!Yt)if(t===null)a.componentDidMount();else{var r=e.elementType===e.type?t.memoizedProps:ea(e.type,t.memoizedProps);a.componentDidUpdate(r,t.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&Rx(e,i,a);break;case 3:var s=e.updateQueue;if(s!==null){if(t=null,e.child!==null)switch(e.child.tag){case 5:t=e.child.stateNode;break;case 1:t=e.child.stateNode}Rx(e,s,t)}break;case 5:var l=e.stateNode;if(t===null&&e.flags&4){t=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&t.focus();break;case"img":u.src&&(t.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var d=e.alternate;if(d!==null){var f=d.memoizedState;if(f!==null){var p=f.dehydrated;p!==null&&tl(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(oe(163))}Yt||e.flags&512&&ih(e)}catch(c){yt(e,e.return,c)}}if(e===n){Me=null;break}if(t=e.sibling,t!==null){t.return=e.return,Me=t;break}Me=e.return}}function rv(n){for(;Me!==null;){var e=Me;if(e===n){Me=null;break}var t=e.sibling;if(t!==null){t.return=e.return,Me=t;break}Me=e.return}}function iv(n){for(;Me!==null;){var e=Me;try{switch(e.tag){case 0:case 11:case 15:var t=e.return;try{Ud(4,e)}catch(u){yt(e,t,u)}break;case 1:var a=e.stateNode;if(typeof a.componentDidMount=="function"){var r=e.return;try{a.componentDidMount()}catch(u){yt(e,r,u)}}var i=e.return;try{ih(e)}catch(u){yt(e,i,u)}break;case 5:var s=e.return;try{ih(e)}catch(u){yt(e,s,u)}}}catch(u){yt(e,e.return,u)}if(e===n){Me=null;break}var l=e.sibling;if(l!==null){l.return=e.return,Me=l;break}Me=e.return}}var v2=Math.ceil,Ed=Xa.ReactCurrentDispatcher,qh=Xa.ReactCurrentOwner,Un=Xa.ReactCurrentBatchConfig,je=0,Nt=null,_t=null,Ot=0,Ln=0,is=Tr(0),Tt=0,fl=null,Si=0,Rd=0,$h=0,Xo=null,gn=null,jh=0,vs=1/0,Ha=null,Id=!1,lh=null,Mr=null,Ju=!1,xr=null,Td=0,Yo=0,uh=null,id=-1,sd=0;function rn(){return(je&6)!==0?wt():id!==-1?id:id=wt()}function _r(n){return(n.mode&1)===0?1:(je&2)!==0&&Ot!==0?Ot&-Ot:t2.transition!==null?(sd===0&&(sd=Pv()),sd):(n=Je,n!==0||(n=window.event,n=n===void 0?16:Uv(n.type)),n)}function ra(n,e,t,a){if(50<Yo)throw Yo=0,uh=null,Error(oe(185));pl(n,t,a),((je&2)===0||n!==Nt)&&(n===Nt&&((je&2)===0&&(Rd|=t),Tt===4&&mr(n,Ot)),bn(n,a),t===1&&je===0&&(e.mode&1)===0&&(vs=wt()+500,zd&&Ar()))}function bn(n,e){var t=n.callbackNode;aM(n,e);var a=fd(n,n===Nt?Ot:0);if(a===0)t!==null&&px(t),n.callbackNode=null,n.callbackPriority=0;else if(e=a&-a,n.callbackPriority!==e){if(t!=null&&px(t),e===1)n.tag===0?e2(sv.bind(null,n)):iy(sv.bind(null,n)),ZM(function(){(je&6)===0&&Ar()}),t=null;else{switch(Dv(a)){case 1:t=yh;break;case 4:t=kv;break;case 16:t=cd;break;case 536870912:t=Nv;break;default:t=cd}t=ab(t,Zy.bind(null,n))}n.callbackPriority=e,n.callbackNode=t}}function Zy(n,e){if(id=-1,sd=0,(je&6)!==0)throw Error(oe(327));var t=n.callbackNode;if(cs()&&n.callbackNode!==t)return null;var a=fd(n,n===Nt?Ot:0);if(a===0)return null;if((a&30)!==0||(a&n.expiredLanes)!==0||e)e=Ad(n,a);else{e=a;var r=je;je|=2;var i=Qy();(Nt!==n||Ot!==e)&&(Ha=null,vs=wt()+500,xi(n,e));do try{w2();break}catch(l){Jy(n,l)}while(!0);Nh(),Ed.current=i,je=r,_t!==null?e=0:(Nt=null,Ot=0,e=Tt)}if(e!==0){if(e===2&&(r=Bp(n),r!==0&&(a=r,e=dh(n,r))),e===1)throw t=fl,xi(n,0),mr(n,a),bn(n,wt()),t;if(e===6)mr(n,a);else{if(r=n.current.alternate,(a&30)===0&&!y2(r)&&(e=Ad(n,a),e===2&&(i=Bp(n),i!==0&&(a=i,e=dh(n,i))),e===1))throw t=fl,xi(n,0),mr(n,a),bn(n,wt()),t;switch(n.finishedWork=r,n.finishedLanes=a,e){case 0:case 1:throw Error(oe(345));case 2:pi(n,gn,Ha);break;case 3:if(mr(n,a),(a&130023424)===a&&(e=jh+500-wt(),10<e)){if(fd(n,0)!==0)break;if(r=n.suspendedLanes,(r&a)!==a){rn(),n.pingedLanes|=n.suspendedLanes&r;break}n.timeoutHandle=Wp(pi.bind(null,n,gn,Ha),e);break}pi(n,gn,Ha);break;case 4:if(mr(n,a),(a&4194240)===a)break;for(e=n.eventTimes,r=-1;0<a;){var s=31-aa(a);i=1<<s,s=e[s],s>r&&(r=s),a&=~i}if(a=r,a=wt()-a,a=(120>a?120:480>a?480:1080>a?1080:1920>a?1920:3e3>a?3e3:4320>a?4320:1960*v2(a/1960))-a,10<a){n.timeoutHandle=Wp(pi.bind(null,n,gn,Ha),a);break}pi(n,gn,Ha);break;case 5:pi(n,gn,Ha);break;default:throw Error(oe(329))}}}return bn(n,wt()),n.callbackNode===t?Zy.bind(null,n):null}function dh(n,e){var t=Xo;return n.current.memoizedState.isDehydrated&&(xi(n,e).flags|=256),n=Ad(n,e),n!==2&&(e=gn,gn=t,e!==null&&ch(e)),n}function ch(n){gn===null?gn=n:gn.push.apply(gn,n)}function y2(n){for(var e=n;;){if(e.flags&16384){var t=e.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var a=0;a<t.length;a++){var r=t[a],i=r.getSnapshot;r=r.value;try{if(!ia(i(),r))return!1}catch{return!1}}}if(t=e.child,e.subtreeFlags&16384&&t!==null)t.return=e,e=t;else{if(e===n)break;for(;e.sibling===null;){if(e.return===null||e.return===n)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function mr(n,e){for(e&=~$h,e&=~Rd,n.suspendedLanes|=e,n.pingedLanes&=~e,n=n.expirationTimes;0<e;){var t=31-aa(e),a=1<<t;n[t]=-1,e&=~a}}function sv(n){if((je&6)!==0)throw Error(oe(327));cs();var e=fd(n,0);if((e&1)===0)return bn(n,wt()),null;var t=Ad(n,e);if(n.tag!==0&&t===2){var a=Bp(n);a!==0&&(e=a,t=dh(n,a))}if(t===1)throw t=fl,xi(n,0),mr(n,e),bn(n,wt()),t;if(t===6)throw Error(oe(345));return n.finishedWork=n.current.alternate,n.finishedLanes=e,pi(n,gn,Ha),bn(n,wt()),null}function Xh(n,e){var t=je;je|=1;try{return n(e)}finally{je=t,je===0&&(vs=wt()+500,zd&&Ar())}}function Mi(n){xr!==null&&xr.tag===0&&(je&6)===0&&cs();var e=je;je|=1;var t=Un.transition,a=Je;try{if(Un.transition=null,Je=1,n)return n()}finally{Je=a,Un.transition=t,je=e,(je&6)===0&&Ar()}}function Yh(){Ln=is.current,lt(is)}function xi(n,e){n.finishedWork=null,n.finishedLanes=0;var t=n.timeoutHandle;if(t!==-1&&(n.timeoutHandle=-1,YM(t)),_t!==null)for(t=_t.return;t!==null;){var a=t;switch(Th(a),a.tag){case 1:a=a.type.childContextTypes,a!=null&&xd();break;case 3:gs(),lt(vn),lt(Zt),Oh();break;case 5:zh(a);break;case 4:gs();break;case 13:lt(pt);break;case 19:lt(pt);break;case 10:Ph(a.type._context);break;case 22:case 23:Yh()}t=t.return}if(Nt=n,_t=n=Lr(n.current,null),Ot=Ln=e,Tt=0,fl=null,$h=Rd=Si=0,gn=Xo=null,mi!==null){for(e=0;e<mi.length;e++)if(t=mi[e],a=t.interleaved,a!==null){t.interleaved=null;var r=a.next,i=t.pending;if(i!==null){var s=i.next;i.next=r,a.next=s}t.pending=a}mi=null}return n}function Jy(n,e){do{var t=_t;try{if(Nh(),nd.current=Cd,Ld){for(var a=ht.memoizedState;a!==null;){var r=a.queue;r!==null&&(r.pending=null),a=a.next}Ld=!1}if(wi=0,kt=It=ht=null,$o=!1,ul=0,qh.current=null,t===null||t.return===null){Tt=1,fl=e,_t=null;break}e:{var i=n,s=t.return,l=t,u=e;if(e=Ot,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var d=u,f=l,p=f.tag;if((f.mode&1)===0&&(p===0||p===11||p===15)){var c=f.alternate;c?(f.updateQueue=c.updateQueue,f.memoizedState=c.memoizedState,f.lanes=c.lanes):(f.updateQueue=null,f.memoizedState=null)}var m=jx(s);if(m!==null){m.flags&=-257,Xx(m,s,l,i,e),m.mode&1&&$x(i,d,e),e=m,u=d;var g=e.updateQueue;if(g===null){var v=new Set;v.add(u),e.updateQueue=v}else g.add(u);break e}else{if((e&1)===0){$x(i,d,e),Zh();break e}u=Error(oe(426))}}else if(dt&&l.mode&1){var w=jx(s);if(w!==null){(w.flags&65536)===0&&(w.flags|=256),Xx(w,s,l,i,e),Ah(xs(u,l));break e}}i=u=xs(u,l),Tt!==4&&(Tt=2),Xo===null?Xo=[i]:Xo.push(i),i=s;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var x=Dy(i,u,e);Ux(i,x);break e;case 1:l=u;var h=i.type,y=i.stateNode;if((i.flags&128)===0&&(typeof h.getDerivedStateFromError=="function"||y!==null&&typeof y.componentDidCatch=="function"&&(Mr===null||!Mr.has(y)))){i.flags|=65536,e&=-e,i.lanes|=e;var _=Fy(i,l,e);Ux(i,_);break e}}i=i.return}while(i!==null)}eb(t)}catch(b){e=b,_t===t&&t!==null&&(_t=t=t.return);continue}break}while(!0)}function Qy(){var n=Ed.current;return Ed.current=Cd,n===null?Cd:n}function Zh(){(Tt===0||Tt===3||Tt===2)&&(Tt=4),Nt===null||(Si&268435455)===0&&(Rd&268435455)===0||mr(Nt,Ot)}function Ad(n,e){var t=je;je|=2;var a=Qy();(Nt!==n||Ot!==e)&&(Ha=null,xi(n,e));do try{b2();break}catch(r){Jy(n,r)}while(!0);if(Nh(),je=t,Ed.current=a,_t!==null)throw Error(oe(261));return Nt=null,Ot=0,Tt}function b2(){for(;_t!==null;)Ky(_t)}function w2(){for(;_t!==null&&!XS();)Ky(_t)}function Ky(n){var e=nb(n.alternate,n,Ln);n.memoizedProps=n.pendingProps,e===null?eb(n):_t=e,qh.current=null}function eb(n){var e=n;do{var t=e.alternate;if(n=e.return,(e.flags&32768)===0){if(t=p2(t,e,Ln),t!==null){_t=t;return}}else{if(t=h2(t,e),t!==null){t.flags&=32767,_t=t;return}if(n!==null)n.flags|=32768,n.subtreeFlags=0,n.deletions=null;else{Tt=6,_t=null;return}}if(e=e.sibling,e!==null){_t=e;return}_t=e=n}while(e!==null);Tt===0&&(Tt=5)}function pi(n,e,t){var a=Je,r=Un.transition;try{Un.transition=null,Je=1,S2(n,e,t,a)}finally{Un.transition=r,Je=a}return null}function S2(n,e,t,a){do cs();while(xr!==null);if((je&6)!==0)throw Error(oe(327));t=n.finishedWork;var r=n.finishedLanes;if(t===null)return null;if(n.finishedWork=null,n.finishedLanes=0,t===n.current)throw Error(oe(177));n.callbackNode=null,n.callbackPriority=0;var i=t.lanes|t.childLanes;if(rM(n,i),n===Nt&&(_t=Nt=null,Ot=0),(t.subtreeFlags&2064)===0&&(t.flags&2064)===0||Ju||(Ju=!0,ab(cd,function(){return cs(),null})),i=(t.flags&15990)!==0,(t.subtreeFlags&15990)!==0||i){i=Un.transition,Un.transition=null;var s=Je;Je=1;var l=je;je|=4,qh.current=null,g2(n,t),Xy(t,n),WM(Gp),pd=!!Rp,Gp=Rp=null,n.current=t,x2(t,n,r),YS(),je=l,Je=s,Un.transition=i}else n.current=t;if(Ju&&(Ju=!1,xr=n,Td=r),i=n.pendingLanes,i===0&&(Mr=null),QS(t.stateNode,a),bn(n,wt()),e!==null)for(a=n.onRecoverableError,t=0;t<e.length;t++)r=e[t],a(r.value,{componentStack:r.stack,digest:r.digest});if(Id)throw Id=!1,n=lh,lh=null,n;return(Td&1)!==0&&n.tag!==0&&cs(),i=n.pendingLanes,(i&1)!==0?n===uh?Yo++:(Yo=0,uh=n):Yo=0,Ar(),null}function cs(){if(xr!==null){var n=Dv(Td),e=Un.transition,t=Je;try{if(Un.transition=null,Je=16>n?16:n,xr===null)var a=!1;else{if(n=xr,xr=null,Td=0,(je&6)!==0)throw Error(oe(331));var r=je;for(je|=4,Me=n.current;Me!==null;){var i=Me,s=i.child;if((Me.flags&16)!==0){var l=i.deletions;if(l!==null){for(var u=0;u<l.length;u++){var d=l[u];for(Me=d;Me!==null;){var f=Me;switch(f.tag){case 0:case 11:case 15:jo(8,f,i)}var p=f.child;if(p!==null)p.return=f,Me=p;else for(;Me!==null;){f=Me;var c=f.sibling,m=f.return;if(qy(f),f===d){Me=null;break}if(c!==null){c.return=m,Me=c;break}Me=m}}}var g=i.alternate;if(g!==null){var v=g.child;if(v!==null){g.child=null;do{var w=v.sibling;v.sibling=null,v=w}while(v!==null)}}Me=i}}if((i.subtreeFlags&2064)!==0&&s!==null)s.return=i,Me=s;else e:for(;Me!==null;){if(i=Me,(i.flags&2048)!==0)switch(i.tag){case 0:case 11:case 15:jo(9,i,i.return)}var x=i.sibling;if(x!==null){x.return=i.return,Me=x;break e}Me=i.return}}var h=n.current;for(Me=h;Me!==null;){s=Me;var y=s.child;if((s.subtreeFlags&2064)!==0&&y!==null)y.return=s,Me=y;else e:for(s=h;Me!==null;){if(l=Me,(l.flags&2048)!==0)try{switch(l.tag){case 0:case 11:case 15:Ud(9,l)}}catch(b){yt(l,l.return,b)}if(l===s){Me=null;break e}var _=l.sibling;if(_!==null){_.return=l.return,Me=_;break e}Me=l.return}}if(je=r,Ar(),wa&&typeof wa.onPostCommitFiberRoot=="function")try{wa.onPostCommitFiberRoot(Nd,n)}catch{}a=!0}return a}finally{Je=t,Un.transition=e}}return!1}function ov(n,e,t){e=xs(t,e),e=Dy(n,e,1),n=Sr(n,e,1),e=rn(),n!==null&&(pl(n,1,e),bn(n,e))}function yt(n,e,t){if(n.tag===3)ov(n,n,t);else for(;e!==null;){if(e.tag===3){ov(e,n,t);break}else if(e.tag===1){var a=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(Mr===null||!Mr.has(a))){n=xs(t,n),n=Fy(e,n,1),e=Sr(e,n,1),n=rn(),e!==null&&(pl(e,1,n),bn(e,n));break}}e=e.return}}function M2(n,e,t){var a=n.pingCache;a!==null&&a.delete(e),e=rn(),n.pingedLanes|=n.suspendedLanes&t,Nt===n&&(Ot&t)===t&&(Tt===4||Tt===3&&(Ot&130023424)===Ot&&500>wt()-jh?xi(n,0):$h|=t),bn(n,e)}function tb(n,e){e===0&&((n.mode&1)===0?e=1:(e=zu,zu<<=1,(zu&130023424)===0&&(zu=4194304)));var t=rn();n=$a(n,e),n!==null&&(pl(n,e,t),bn(n,t))}function _2(n){var e=n.memoizedState,t=0;e!==null&&(t=e.retryLane),tb(n,t)}function L2(n,e){var t=0;switch(n.tag){case 13:var a=n.stateNode,r=n.memoizedState;r!==null&&(t=r.retryLane);break;case 19:a=n.stateNode;break;default:throw Error(oe(314))}a!==null&&a.delete(e),tb(n,t)}var nb;nb=function(n,e,t){if(n!==null)if(n.memoizedProps!==e.pendingProps||vn.current)xn=!0;else{if((n.lanes&t)===0&&(e.flags&128)===0)return xn=!1,f2(n,e,t);xn=(n.flags&131072)!==0}else xn=!1,dt&&(e.flags&1048576)!==0&&sy(e,bd,e.index);switch(e.lanes=0,e.tag){case 2:var a=e.type;rd(n,e),n=e.pendingProps;var r=ps(e,Zt.current);ds(e,t),r=Uh(null,e,a,n,r,t);var i=Rh();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,yn(a)?(i=!0,vd(e)):i=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Fh(e),r.updater=Hd,e.stateNode=r,r._reactInternals=e,Jp(e,a,n,t),e=eh(null,e,a,!0,i,t)):(e.tag=0,dt&&i&&Ih(e),an(null,e,r,t),e=e.child),e;case 16:a=e.elementType;e:{switch(rd(n,e),n=e.pendingProps,r=a._init,a=r(a._payload),e.type=a,r=e.tag=E2(a),n=ea(a,n),r){case 0:e=Kp(null,e,a,n,t);break e;case 1:e=Jx(null,e,a,n,t);break e;case 11:e=Yx(null,e,a,n,t);break e;case 14:e=Zx(null,e,a,ea(a.type,n),t);break e}throw Error(oe(306,a,""))}return e;case 0:return a=e.type,r=e.pendingProps,r=e.elementType===a?r:ea(a,r),Kp(n,e,a,r,t);case 1:return a=e.type,r=e.pendingProps,r=e.elementType===a?r:ea(a,r),Jx(n,e,a,r,t);case 3:e:{if(Hy(e),n===null)throw Error(oe(387));a=e.pendingProps,i=e.memoizedState,r=i.element,fy(n,e),Md(e,a,null,t);var s=e.memoizedState;if(a=s.element,i.isDehydrated)if(i={element:a,isDehydrated:!1,cache:s.cache,pendingSuspenseBoundaries:s.pendingSuspenseBoundaries,transitions:s.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){r=xs(Error(oe(423)),e),e=Qx(n,e,a,t,r);break e}else if(a!==r){r=xs(Error(oe(424)),e),e=Qx(n,e,a,t,r);break e}else for(Cn=wr(e.stateNode.containerInfo.firstChild),En=e,dt=!0,na=null,t=dy(e,null,a,t),e.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(hs(),a===r){e=ja(n,e,t);break e}an(n,e,a,t)}e=e.child}return e;case 5:return py(e),n===null&&Xp(e),a=e.type,r=e.pendingProps,i=n!==null?n.memoizedProps:null,s=r.children,Vp(a,r)?s=null:i!==null&&Vp(a,i)&&(e.flags|=32),Oy(n,e),an(n,e,s,t),e.child;case 6:return n===null&&Xp(e),null;case 13:return Uy(n,e,t);case 4:return Bh(e,e.stateNode.containerInfo),a=e.pendingProps,n===null?e.child=ms(e,null,a,t):an(n,e,a,t),e.child;case 11:return a=e.type,r=e.pendingProps,r=e.elementType===a?r:ea(a,r),Yx(n,e,a,r,t);case 7:return an(n,e,e.pendingProps,t),e.child;case 8:return an(n,e,e.pendingProps.children,t),e.child;case 12:return an(n,e,e.pendingProps.children,t),e.child;case 10:e:{if(a=e.type._context,r=e.pendingProps,i=e.memoizedProps,s=r.value,at(wd,a._currentValue),a._currentValue=s,i!==null)if(ia(i.value,s)){if(i.children===r.children&&!vn.current){e=ja(n,e,t);break e}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var l=i.dependencies;if(l!==null){s=i.child;for(var u=l.firstContext;u!==null;){if(u.context===a){if(i.tag===1){u=Va(-1,t&-t),u.tag=2;var d=i.updateQueue;if(d!==null){d=d.shared;var f=d.pending;f===null?u.next=u:(u.next=f.next,f.next=u),d.pending=u}}i.lanes|=t,u=i.alternate,u!==null&&(u.lanes|=t),Yp(i.return,t,e),l.lanes|=t;break}u=u.next}}else if(i.tag===10)s=i.type===e.type?null:i.child;else if(i.tag===18){if(s=i.return,s===null)throw Error(oe(341));s.lanes|=t,l=s.alternate,l!==null&&(l.lanes|=t),Yp(s,t,e),s=i.sibling}else s=i.child;if(s!==null)s.return=i;else for(s=i;s!==null;){if(s===e){s=null;break}if(i=s.sibling,i!==null){i.return=s.return,s=i;break}s=s.return}i=s}an(n,e,r.children,t),e=e.child}return e;case 9:return r=e.type,a=e.pendingProps.children,ds(e,t),r=Rn(r),a=a(r),e.flags|=1,an(n,e,a,t),e.child;case 14:return a=e.type,r=ea(a,e.pendingProps),r=ea(a.type,r),Zx(n,e,a,r,t);case 15:return By(n,e,e.type,e.pendingProps,t);case 17:return a=e.type,r=e.pendingProps,r=e.elementType===a?r:ea(a,r),rd(n,e),e.tag=1,yn(a)?(n=!0,vd(e)):n=!1,ds(e,t),Py(e,a,r),Jp(e,a,r,t),eh(null,e,a,!0,n,t);case 19:return Ry(n,e,t);case 22:return zy(n,e,t)}throw Error(oe(156,e.tag))};function ab(n,e){return Av(n,e)}function C2(n,e,t,a){this.tag=n,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Hn(n,e,t,a){return new C2(n,e,t,a)}function Jh(n){return n=n.prototype,!(!n||!n.isReactComponent)}function E2(n){if(typeof n=="function")return Jh(n)?1:0;if(n!=null){if(n=n.$$typeof,n===gh)return 11;if(n===xh)return 14}return 2}function Lr(n,e){var t=n.alternate;return t===null?(t=Hn(n.tag,e,n.key,n.mode),t.elementType=n.elementType,t.type=n.type,t.stateNode=n.stateNode,t.alternate=n,n.alternate=t):(t.pendingProps=e,t.type=n.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=n.flags&14680064,t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},t.sibling=n.sibling,t.index=n.index,t.ref=n.ref,t}function od(n,e,t,a,r,i){var s=2;if(a=n,typeof n=="function")Jh(n)&&(s=1);else if(typeof n=="string")s=5;else e:switch(n){case Yi:return vi(t.children,r,i,e);case mh:s=8,r|=8;break;case wp:return n=Hn(12,t,e,r|2),n.elementType=wp,n.lanes=i,n;case Sp:return n=Hn(13,t,e,r),n.elementType=Sp,n.lanes=i,n;case Mp:return n=Hn(19,t,e,r),n.elementType=Mp,n.lanes=i,n;case pv:return Gd(t,r,i,e);default:if(typeof n=="object"&&n!==null)switch(n.$$typeof){case cv:s=10;break e;case fv:s=9;break e;case gh:s=11;break e;case xh:s=14;break e;case fr:s=16,a=null;break e}throw Error(oe(130,n==null?n:typeof n,""))}return e=Hn(s,t,e,r),e.elementType=n,e.type=a,e.lanes=i,e}function vi(n,e,t,a){return n=Hn(7,n,a,e),n.lanes=t,n}function Gd(n,e,t,a){return n=Hn(22,n,a,e),n.elementType=pv,n.lanes=t,n.stateNode={isHidden:!1},n}function vp(n,e,t){return n=Hn(6,n,null,e),n.lanes=t,n}function yp(n,e,t){return e=Hn(4,n.children!==null?n.children:[],n.key,e),e.lanes=t,e.stateNode={containerInfo:n.containerInfo,pendingChildren:null,implementation:n.implementation},e}function I2(n,e,t,a,r){this.tag=e,this.containerInfo=n,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=np(0),this.expirationTimes=np(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=np(0),this.identifierPrefix=a,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Qh(n,e,t,a,r,i,s,l,u){return n=new I2(n,e,t,l,u),e===1?(e=1,i===!0&&(e|=8)):e=0,i=Hn(3,null,null,e),n.current=i,i.stateNode=n,i.memoizedState={element:a,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Fh(i),n}function T2(n,e,t){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Xi,key:a==null?null:""+a,children:n,containerInfo:e,implementation:t}}function rb(n){if(!n)return Er;n=n._reactInternals;e:{if(Li(n)!==n||n.tag!==1)throw Error(oe(170));var e=n;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(yn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(oe(171))}if(n.tag===1){var t=n.type;if(yn(t))return ry(n,t,e)}return e}function ib(n,e,t,a,r,i,s,l,u){return n=Qh(t,a,!0,n,r,i,s,l,u),n.context=rb(null),t=n.current,a=rn(),r=_r(t),i=Va(a,r),i.callback=e??null,Sr(t,i,r),n.current.lanes=r,pl(n,r,a),bn(n,a),n}function Vd(n,e,t,a){var r=e.current,i=rn(),s=_r(r);return t=rb(t),e.context===null?e.context=t:e.pendingContext=t,e=Va(i,s),e.payload={element:n},a=a===void 0?null:a,a!==null&&(e.callback=a),n=Sr(r,e,s),n!==null&&(ra(n,r,s,i),td(n,r,s)),s}function kd(n){return n=n.current,n.child?(n.child.tag===5,n.child.stateNode):null}function lv(n,e){if(n=n.memoizedState,n!==null&&n.dehydrated!==null){var t=n.retryLane;n.retryLane=t!==0&&t<e?t:e}}function Kh(n,e){lv(n,e),(n=n.alternate)&&lv(n,e)}function A2(){return null}var sb=typeof reportError=="function"?reportError:function(n){console.error(n)};function em(n){this._internalRoot=n}Wd.prototype.render=em.prototype.render=function(n){var e=this._internalRoot;if(e===null)throw Error(oe(409));Vd(n,e,null,null)};Wd.prototype.unmount=em.prototype.unmount=function(){var n=this._internalRoot;if(n!==null){this._internalRoot=null;var e=n.containerInfo;Mi(function(){Vd(null,n,null,null)}),e[qa]=null}};function Wd(n){this._internalRoot=n}Wd.prototype.unstable_scheduleHydration=function(n){if(n){var e=zv();n={blockedOn:null,target:n,priority:e};for(var t=0;t<hr.length&&e!==0&&e<hr[t].priority;t++);hr.splice(t,0,n),t===0&&Hv(n)}};function tm(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11)}function qd(n){return!(!n||n.nodeType!==1&&n.nodeType!==9&&n.nodeType!==11&&(n.nodeType!==8||n.nodeValue!==" react-mount-point-unstable "))}function uv(){}function k2(n,e,t,a,r){if(r){if(typeof a=="function"){var i=a;a=function(){var d=kd(s);i.call(d)}}var s=ib(e,a,n,0,null,!1,!1,"",uv);return n._reactRootContainer=s,n[qa]=s.current,rl(n.nodeType===8?n.parentNode:n),Mi(),s}for(;r=n.lastChild;)n.removeChild(r);if(typeof a=="function"){var l=a;a=function(){var d=kd(u);l.call(d)}}var u=Qh(n,0,!1,null,null,!1,!1,"",uv);return n._reactRootContainer=u,n[qa]=u.current,rl(n.nodeType===8?n.parentNode:n),Mi(function(){Vd(e,u,t,a)}),u}function $d(n,e,t,a,r){var i=t._reactRootContainer;if(i){var s=i;if(typeof r=="function"){var l=r;r=function(){var u=kd(s);l.call(u)}}Vd(e,s,n,r)}else s=k2(t,e,n,r,a);return kd(s)}Fv=function(n){switch(n.tag){case 3:var e=n.stateNode;if(e.current.memoizedState.isDehydrated){var t=Ho(e.pendingLanes);t!==0&&(bh(e,t|1),bn(e,wt()),(je&6)===0&&(vs=wt()+500,Ar()))}break;case 13:Mi(function(){var a=$a(n,1);if(a!==null){var r=rn();ra(a,n,1,r)}}),Kh(n,1)}};wh=function(n){if(n.tag===13){var e=$a(n,134217728);if(e!==null){var t=rn();ra(e,n,134217728,t)}Kh(n,134217728)}};Bv=function(n){if(n.tag===13){var e=_r(n),t=$a(n,e);if(t!==null){var a=rn();ra(t,n,e,a)}Kh(n,e)}};zv=function(){return Je};Ov=function(n,e){var t=Je;try{return Je=n,e()}finally{Je=t}};Pp=function(n,e,t){switch(e){case"input":if(Cp(n,t),e=t.name,t.type==="radio"&&e!=null){for(t=n;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<t.length;e++){var a=t[e];if(a!==n&&a.form===n.form){var r=Bd(a);if(!r)throw Error(oe(90));mv(a),Cp(a,r)}}}break;case"textarea":xv(n,t);break;case"select":e=t.value,e!=null&&ss(n,!!t.multiple,e,!1)}};_v=Xh;Lv=Mi;var N2={usingClientEntryPoint:!1,Events:[ml,Ki,Bd,Sv,Mv,Xh]},Fo={findFiberByHostInstance:hi,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},P2={bundleType:Fo.bundleType,version:Fo.version,rendererPackageName:Fo.rendererPackageName,rendererConfig:Fo.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Xa.ReactCurrentDispatcher,findHostInstanceByFiber:function(n){return n=Iv(n),n===null?null:n.stateNode},findFiberByHostInstance:Fo.findFiberByHostInstance||A2,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(Bo=__REACT_DEVTOOLS_GLOBAL_HOOK__,!Bo.isDisabled&&Bo.supportsFiber))try{Nd=Bo.inject(P2),wa=Bo}catch{}var Bo;An.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=N2;An.createPortal=function(n,e){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!tm(e))throw Error(oe(200));return T2(n,e,null,t)};An.createRoot=function(n,e){if(!tm(n))throw Error(oe(299));var t=!1,a="",r=sb;return e!=null&&(e.unstable_strictMode===!0&&(t=!0),e.identifierPrefix!==void 0&&(a=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Qh(n,1,!1,null,null,t,!1,a,r),n[qa]=e.current,rl(n.nodeType===8?n.parentNode:n),new em(e)};An.findDOMNode=function(n){if(n==null)return null;if(n.nodeType===1)return n;var e=n._reactInternals;if(e===void 0)throw typeof n.render=="function"?Error(oe(188)):(n=Object.keys(n).join(","),Error(oe(268,n)));return n=Iv(e),n=n===null?null:n.stateNode,n};An.flushSync=function(n){return Mi(n)};An.hydrate=function(n,e,t){if(!qd(e))throw Error(oe(200));return $d(null,n,e,!0,t)};An.hydrateRoot=function(n,e,t){if(!tm(n))throw Error(oe(405));var a=t!=null&&t.hydratedSources||null,r=!1,i="",s=sb;if(t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onRecoverableError!==void 0&&(s=t.onRecoverableError)),e=ib(e,null,n,1,t??null,r,!1,i,s),n[qa]=e.current,rl(n),a)for(n=0;n<a.length;n++)t=a[n],r=t._getVersion,r=r(t._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[t,r]:e.mutableSourceEagerHydrationData.push(t,r);return new Wd(e)};An.render=function(n,e,t){if(!qd(e))throw Error(oe(200));return $d(null,n,e,!1,t)};An.unmountComponentAtNode=function(n){if(!qd(n))throw Error(oe(40));return n._reactRootContainer?(Mi(function(){$d(null,null,n,!1,function(){n._reactRootContainer=null,n[qa]=null})}),!0):!1};An.unstable_batchedUpdates=Xh;An.unstable_renderSubtreeIntoContainer=function(n,e,t,a){if(!qd(t))throw Error(oe(200));if(n==null||n._reactInternals===void 0)throw Error(oe(38));return $d(n,e,t,!1,a)};An.version="18.3.1-next-f1338f8080-20240426"});var db=di((C3,ub)=>{"use strict";function lb(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(lb)}catch(n){console.error(n)}}lb(),ub.exports=ob()});var fb=di(nm=>{"use strict";var cb=db();nm.createRoot=cb.createRoot,nm.hydrateRoot=cb.hydrateRoot;var E3});var lS=_o(qi()),uS=_o(fb());var o=_o(qi());var D2=0,pb=1,F2=2;var O1=1,B2=2,Il=3,sf=0,Dt=1,of=2,H1=1;var Ur=0,Al=1,Cc=2,hb=3,mb=4,z2=5,Us=100,O2=101,H2=102,gb=103,xb=104,U2=200,R2=201,G2=202,V2=203,U1=204,R1=205,W2=206,q2=207,$2=208,j2=209,X2=210,Y2=0,Z2=1,J2=2,Um=3,Q2=4,K2=5,e_=6,t_=7,lf=0,n_=1,a_=2,Ws=0,r_=1,i_=2,s_=3,uf=4,o_=5,G1=300,Jg=301,Qg=302,vb=303,yb=304,df=306,Kg=307,Rm=1e3,da=1001,Gm=1002,Rt=1003,bb=1004;var wb=1005;var Wn=1006,l_=1007;var e0=1008;var tu=1009,u_=1010,d_=1011,Ec=1012,c_=1013,Lc=1014,Hr=1015,Ic=1016,f_=1017,p_=1018,h_=1019,kl=1020,m_=1021,Ai=1022,qn=1023,g_=1024,x_=1025,v_=qn,qs=1026,Fl=1027,y_=1028,b_=1029,w_=1030,S_=1031,M_=1032,__=1033,Sb=33776,Mb=33777,_b=33778,Lb=33779,Cb=35840,Eb=35841,Ib=35842,Tb=35843,L_=36196,Ab=37492,kb=37496,C_=37808,E_=37809,I_=37810,T_=37811,A_=37812,k_=37813,N_=37814,P_=37815,D_=37816,F_=37817,B_=37818,z_=37819,O_=37820,H_=37821,U_=36492,R_=37840,G_=37841,V_=37842,W_=37843,q_=37844,$_=37845,j_=37846,X_=37847,Y_=37848,Z_=37849,J_=37850,Q_=37851,K_=37852,eL=37853,tL=2200,nL=2201,aL=2202,Tc=2300,Ac=2301,am=2302,Rs=2400,Gs=2401,kc=2402,t0=2500,V1=2501,rL=0;var Sn=3e3,Aa=3001,n0=3007,a0=3002,iL=3003,W1=3004,q1=3005,$1=3006,sL=3200,oL=3201,so=0,lL=1;var rm=7680;var uL=519,Bl=35044,Nc=35048;var Nb="300 es",tr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let a=this._listeners;a[e]===void 0&&(a[e]=[]),a[e].indexOf(t)===-1&&a[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let a=this._listeners;return a[e]!==void 0&&a[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let r=this._listeners[e];if(r!==void 0){let i=r.indexOf(t);i!==-1&&r.splice(i,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let a=this._listeners[e.type];if(a!==void 0){e.target=this;let r=a.slice(0);for(let i=0,s=r.length;i<s;i++)r[i].call(this,e);e.target=null}}},Ut=[];for(let n=0;n<256;n++)Ut[n]=(n<16?"0":"")+n.toString(16);var im=Math.PI/180,Vm=180/Math.PI;function ca(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,a=Math.random()*4294967295|0;return(Ut[n&255]+Ut[n>>8&255]+Ut[n>>16&255]+Ut[n>>24&255]+"-"+Ut[e&255]+Ut[e>>8&255]+"-"+Ut[e>>16&15|64]+Ut[e>>24&255]+"-"+Ut[t&63|128]+Ut[t>>8&255]+"-"+Ut[t>>16&255]+Ut[t>>24&255]+Ut[a&255]+Ut[a>>8&255]+Ut[a>>16&255]+Ut[a>>24&255]).toUpperCase()}function wn(n,e,t){return Math.max(e,Math.min(t,n))}function dL(n,e){return(n%e+e)%e}function sm(n,e,t){return(1-t)*n+t*e}function Pb(n){return(n&n-1)===0&&n!==0}function cL(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function fL(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}var le=class{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this)}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this)}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,a=this.y,r=e.elements;return this.x=r[0]*t+r[3]*a+r[6],this.y=r[1]*t+r[4]*a+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(e,Math.min(t,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,a=this.y-e.y;return t*t+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,a){return this.x=e.x+(t.x-e.x)*a,this.y=e.y+(t.y-e.y)*a,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t,a){return a!==void 0&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let a=Math.cos(t),r=Math.sin(t),i=this.x-e.x,s=this.y-e.y;return this.x=i*a-s*r+e.x,this.y=i*r+s*a+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}};le.prototype.isVector2=!0;var At=class{constructor(){this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}set(e,t,a,r,i,s,l,u,d){let f=this.elements;return f[0]=e,f[1]=r,f[2]=l,f[3]=t,f[4]=i,f[5]=u,f[6]=a,f[7]=s,f[8]=d,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,a=e.elements;return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[8]=a[8],this}extractBasis(e,t,a){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),a.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let a=e.elements,r=t.elements,i=this.elements,s=a[0],l=a[3],u=a[6],d=a[1],f=a[4],p=a[7],c=a[2],m=a[5],g=a[8],v=r[0],w=r[3],x=r[6],h=r[1],y=r[4],_=r[7],b=r[2],M=r[5],S=r[8];return i[0]=s*v+l*h+u*b,i[3]=s*w+l*y+u*M,i[6]=s*x+l*_+u*S,i[1]=d*v+f*h+p*b,i[4]=d*w+f*y+p*M,i[7]=d*x+f*_+p*S,i[2]=c*v+m*h+g*b,i[5]=c*w+m*y+g*M,i[8]=c*x+m*_+g*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],a=e[1],r=e[2],i=e[3],s=e[4],l=e[5],u=e[6],d=e[7],f=e[8];return t*s*f-t*l*d-a*i*f+a*l*u+r*i*d-r*s*u}invert(){let e=this.elements,t=e[0],a=e[1],r=e[2],i=e[3],s=e[4],l=e[5],u=e[6],d=e[7],f=e[8],p=f*s-l*d,c=l*u-f*i,m=d*i-s*u,g=t*p+a*c+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return e[0]=p*v,e[1]=(r*d-f*a)*v,e[2]=(l*a-r*s)*v,e[3]=c*v,e[4]=(f*t-r*u)*v,e[5]=(r*i-l*t)*v,e[6]=m*v,e[7]=(a*u-d*t)*v,e[8]=(s*t-a*i)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,a,r,i,s,l){let u=Math.cos(i),d=Math.sin(i);return this.set(a*u,a*d,-a*(u*s+d*l)+s+e,-r*d,r*u,-r*(-d*s+u*l)+l+t,0,0,1),this}scale(e,t){let a=this.elements;return a[0]*=e,a[3]*=e,a[6]*=e,a[1]*=t,a[4]*=t,a[7]*=t,this}rotate(e){let t=Math.cos(e),a=Math.sin(e),r=this.elements,i=r[0],s=r[3],l=r[6],u=r[1],d=r[4],f=r[7];return r[0]=t*i+a*u,r[3]=t*s+a*d,r[6]=t*l+a*f,r[1]=-a*i+t*u,r[4]=-a*s+t*d,r[7]=-a*l+t*f,this}translate(e,t){let a=this.elements;return a[0]+=e*a[2],a[3]+=e*a[5],a[6]+=e*a[8],a[1]+=t*a[2],a[4]+=t*a[5],a[7]+=t*a[8],this}equals(e){let t=this.elements,a=e.elements;for(let r=0;r<9;r++)if(t[r]!==a[r])return!1;return!0}fromArray(e,t=0){for(let a=0;a<9;a++)this.elements[a]=e[a+t];return this}toArray(e=[],t=0){let a=this.elements;return e[t]=a[0],e[t+1]=a[1],e[t+2]=a[2],e[t+3]=a[3],e[t+4]=a[4],e[t+5]=a[5],e[t+6]=a[6],e[t+7]=a[7],e[t+8]=a[8],e}clone(){return new this.constructor().fromArray(this.elements)}};At.prototype.isMatrix3=!0;var ws,Vr=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ws===void 0&&(ws=document.createElementNS("http://www.w3.org/1999/xhtml","canvas")),ws.width=e.width,ws.height=e.height;let a=ws.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),t=ws}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}},pL=0,Kt=class n extends tr{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,a=da,r=da,i=Wn,s=e0,l=qn,u=tu,d=1,f=Sn){super(),Object.defineProperty(this,"id",{value:pL++}),this.uuid=ca(),this.name="",this.image=e,this.mipmaps=[],this.mapping=t,this.wrapS=a,this.wrapT=r,this.magFilter=i,this.minFilter=s,this.anisotropy=d,this.format=l,this.internalFormat=null,this.type=u,this.offset=new le(0,0),this.repeat=new le(1,1),this.center=new le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new At,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=f,this.version=0,this.onUpdate=null}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.image=e.image,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.encoding=e.encoding,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let a={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(this.image!==void 0){let r=this.image;if(r.uuid===void 0&&(r.uuid=ca()),!t&&e.images[r.uuid]===void 0){let i;if(Array.isArray(r)){i=[];for(let s=0,l=r.length;s<l;s++)r[s].isDataTexture?i.push(om(r[s].image)):i.push(om(r[s]))}else i=om(r);e.images[r.uuid]={uuid:r.uuid,url:i}}a.image=r.uuid}return t||(e.textures[this.uuid]=a),a}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==G1)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Rm:e.x=e.x-Math.floor(e.x);break;case da:e.x=e.x<0?0:1;break;case Gm:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Rm:e.y=e.y-Math.floor(e.y);break;case da:e.y=e.y<0?0:1;break;case Gm:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&this.version++}};Kt.DEFAULT_IMAGE=void 0;Kt.DEFAULT_MAPPING=G1;Kt.prototype.isTexture=!0;function om(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Vr.getDataURL(n):n.data?{data:Array.prototype.slice.call(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Ye=class{constructor(e=0,t=0,a=0,r=1){this.x=e,this.y=t,this.z=a,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,a,r){return this.x=e,this.y=t,this.z=a,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this)}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this)}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,a=this.y,r=this.z,i=this.w,s=e.elements;return this.x=s[0]*t+s[4]*a+s[8]*r+s[12]*i,this.y=s[1]*t+s[5]*a+s[9]*r+s[13]*i,this.z=s[2]*t+s[6]*a+s[10]*r+s[14]*i,this.w=s[3]*t+s[7]*a+s[11]*r+s[15]*i,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,a,r,i,u=e.elements,d=u[0],f=u[4],p=u[8],c=u[1],m=u[5],g=u[9],v=u[2],w=u[6],x=u[10];if(Math.abs(f-c)<.01&&Math.abs(p-v)<.01&&Math.abs(g-w)<.01){if(Math.abs(f+c)<.1&&Math.abs(p+v)<.1&&Math.abs(g+w)<.1&&Math.abs(d+m+x-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let y=(d+1)/2,_=(m+1)/2,b=(x+1)/2,M=(f+c)/4,S=(p+v)/4,k=(g+w)/4;return y>_&&y>b?y<.01?(a=0,r=.707106781,i=.707106781):(a=Math.sqrt(y),r=M/a,i=S/a):_>b?_<.01?(a=.707106781,r=0,i=.707106781):(r=Math.sqrt(_),a=M/r,i=k/r):b<.01?(a=.707106781,r=.707106781,i=0):(i=Math.sqrt(b),a=S/i,r=k/i),this.set(a,r,i,t),this}let h=Math.sqrt((w-g)*(w-g)+(p-v)*(p-v)+(c-f)*(c-f));return Math.abs(h)<.001&&(h=1),this.x=(w-g)/h,this.y=(p-v)/h,this.z=(c-f)/h,this.w=Math.acos((d+m+x-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(e,Math.min(t,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,a){return this.x=e.x+(t.x-e.x)*a,this.y=e.y+(t.y-e.y)*a,this.z=e.z+(t.z-e.z)*a,this.w=e.w+(t.w-e.w)*a,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t,a){return a!==void 0&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}};Ye.prototype.isVector4=!0;var Ea=class extends tr{constructor(e,t,a){super(),this.width=e,this.height=t,this.depth=1,this.scissor=new Ye(0,0,e,t),this.scissorTest=!1,this.viewport=new Ye(0,0,e,t),a=a||{},this.texture=new Kt(void 0,a.mapping,a.wrapS,a.wrapT,a.magFilter,a.minFilter,a.format,a.type,a.anisotropy,a.encoding),this.texture.image={},this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=1,this.texture.generateMipmaps=a.generateMipmaps!==void 0?a.generateMipmaps:!1,this.texture.minFilter=a.minFilter!==void 0?a.minFilter:Wn,this.depthBuffer=a.depthBuffer!==void 0?a.depthBuffer:!0,this.stencilBuffer=a.stencilBuffer!==void 0?a.stencilBuffer:!1,this.depthTexture=a.depthTexture!==void 0?a.depthTexture:null}setTexture(e){e.image={width:this.width,height:this.height,depth:this.depth},this.texture=e}setSize(e,t,a=1){(this.width!==e||this.height!==t||this.depth!==a)&&(this.width=e,this.height=t,this.depth=a,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=a,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.width=e.width,this.height=e.height,this.depth=e.depth,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.depthTexture=e.depthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}};Ea.prototype.isWebGLRenderTarget=!0;var Wm=class extends Ea{constructor(e,t,a){super(e,t,a),this.samples=4}copy(e){return super.copy.call(this,e),this.samples=e.samples,this}};Wm.prototype.isWebGLMultisampleRenderTarget=!0;var Gt=class{constructor(e=0,t=0,a=0,r=1){this._x=e,this._y=t,this._z=a,this._w=r}static slerp(e,t,a,r){return console.warn("THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead."),a.slerpQuaternions(e,t,r)}static slerpFlat(e,t,a,r,i,s,l){let u=a[r+0],d=a[r+1],f=a[r+2],p=a[r+3],c=i[s+0],m=i[s+1],g=i[s+2],v=i[s+3];if(l===0){e[t+0]=u,e[t+1]=d,e[t+2]=f,e[t+3]=p;return}if(l===1){e[t+0]=c,e[t+1]=m,e[t+2]=g,e[t+3]=v;return}if(p!==v||u!==c||d!==m||f!==g){let w=1-l,x=u*c+d*m+f*g+p*v,h=x>=0?1:-1,y=1-x*x;if(y>Number.EPSILON){let b=Math.sqrt(y),M=Math.atan2(b,x*h);w=Math.sin(w*M)/b,l=Math.sin(l*M)/b}let _=l*h;if(u=u*w+c*_,d=d*w+m*_,f=f*w+g*_,p=p*w+v*_,w===1-l){let b=1/Math.sqrt(u*u+d*d+f*f+p*p);u*=b,d*=b,f*=b,p*=b}}e[t]=u,e[t+1]=d,e[t+2]=f,e[t+3]=p}static multiplyQuaternionsFlat(e,t,a,r,i,s){let l=a[r],u=a[r+1],d=a[r+2],f=a[r+3],p=i[s],c=i[s+1],m=i[s+2],g=i[s+3];return e[t]=l*g+f*p+u*m-d*c,e[t+1]=u*g+f*c+d*p-l*m,e[t+2]=d*g+f*m+l*c-u*p,e[t+3]=f*g-l*p-u*c-d*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,a,r){return this._x=e,this._y=t,this._z=a,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){if(!(e&&e.isEuler))throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");let a=e._x,r=e._y,i=e._z,s=e._order,l=Math.cos,u=Math.sin,d=l(a/2),f=l(r/2),p=l(i/2),c=u(a/2),m=u(r/2),g=u(i/2);switch(s){case"XYZ":this._x=c*f*p+d*m*g,this._y=d*m*p-c*f*g,this._z=d*f*g+c*m*p,this._w=d*f*p-c*m*g;break;case"YXZ":this._x=c*f*p+d*m*g,this._y=d*m*p-c*f*g,this._z=d*f*g-c*m*p,this._w=d*f*p+c*m*g;break;case"ZXY":this._x=c*f*p-d*m*g,this._y=d*m*p+c*f*g,this._z=d*f*g+c*m*p,this._w=d*f*p-c*m*g;break;case"ZYX":this._x=c*f*p-d*m*g,this._y=d*m*p+c*f*g,this._z=d*f*g-c*m*p,this._w=d*f*p+c*m*g;break;case"YZX":this._x=c*f*p+d*m*g,this._y=d*m*p+c*f*g,this._z=d*f*g-c*m*p,this._w=d*f*p-c*m*g;break;case"XZY":this._x=c*f*p-d*m*g,this._y=d*m*p-c*f*g,this._z=d*f*g+c*m*p,this._w=d*f*p+c*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+s)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let a=t/2,r=Math.sin(a);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(a),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,a=t[0],r=t[4],i=t[8],s=t[1],l=t[5],u=t[9],d=t[2],f=t[6],p=t[10],c=a+l+p;if(c>0){let m=.5/Math.sqrt(c+1);this._w=.25/m,this._x=(f-u)*m,this._y=(i-d)*m,this._z=(s-r)*m}else if(a>l&&a>p){let m=2*Math.sqrt(1+a-l-p);this._w=(f-u)/m,this._x=.25*m,this._y=(r+s)/m,this._z=(i+d)/m}else if(l>p){let m=2*Math.sqrt(1+l-a-p);this._w=(i-d)/m,this._x=(r+s)/m,this._y=.25*m,this._z=(u+f)/m}else{let m=2*Math.sqrt(1+p-a-l);this._w=(s-r)/m,this._x=(i+d)/m,this._y=(u+f)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let a=e.dot(t)+1;return a<Number.EPSILON?(a=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=a):(this._x=0,this._y=-e.z,this._z=e.y,this._w=a)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=a),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(wn(this.dot(e),-1,1)))}rotateTowards(e,t){let a=this.angleTo(e);if(a===0)return this;let r=Math.min(1,t/a);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e,t){return t!==void 0?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(e,t)):this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let a=e._x,r=e._y,i=e._z,s=e._w,l=t._x,u=t._y,d=t._z,f=t._w;return this._x=a*f+s*l+r*d-i*u,this._y=r*f+s*u+i*l-a*d,this._z=i*f+s*d+a*u-r*l,this._w=s*f-a*l-r*u-i*d,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let a=this._x,r=this._y,i=this._z,s=this._w,l=s*e._w+a*e._x+r*e._y+i*e._z;if(l<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,l=-l):this.copy(e),l>=1)return this._w=s,this._x=a,this._y=r,this._z=i,this;let u=1-l*l;if(u<=Number.EPSILON){let m=1-t;return this._w=m*s+t*this._w,this._x=m*a+t*this._x,this._y=m*r+t*this._y,this._z=m*i+t*this._z,this.normalize(),this._onChangeCallback(),this}let d=Math.sqrt(u),f=Math.atan2(d,l),p=Math.sin((1-t)*f)/d,c=Math.sin(t*f)/d;return this._w=s*p+this._w*c,this._x=a*p+this._x*c,this._y=r*p+this._y*c,this._z=i*p+this._z*c,this._onChangeCallback(),this}slerpQuaternions(e,t,a){this.copy(e).slerp(t,a)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}};Gt.prototype.isQuaternion=!0;var D=class{constructor(e=0,t=0,a=0){this.x=e,this.y=t,this.z=a}set(e,t,a){return a===void 0&&(a=this.z),this.x=e,this.y=t,this.z=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e,t){return t!==void 0?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this.z+=e.z,this)}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e,t){return t!==void 0?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this.z-=e.z,this)}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e,t){return t!==void 0?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(e,t)):(this.x*=e.x,this.y*=e.y,this.z*=e.z,this)}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return e&&e.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(Db.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Db.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,a=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*a+i[6]*r,this.y=i[1]*t+i[4]*a+i[7]*r,this.z=i[2]*t+i[5]*a+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,a=this.y,r=this.z,i=e.elements,s=1/(i[3]*t+i[7]*a+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*a+i[8]*r+i[12])*s,this.y=(i[1]*t+i[5]*a+i[9]*r+i[13])*s,this.z=(i[2]*t+i[6]*a+i[10]*r+i[14])*s,this}applyQuaternion(e){let t=this.x,a=this.y,r=this.z,i=e.x,s=e.y,l=e.z,u=e.w,d=u*t+s*r-l*a,f=u*a+l*t-i*r,p=u*r+i*a-s*t,c=-i*t-s*a-l*r;return this.x=d*u+c*-i+f*-l-p*-s,this.y=f*u+c*-s+p*-i-d*-l,this.z=p*u+c*-l+d*-s-f*-i,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,a=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*a+i[8]*r,this.y=i[1]*t+i[5]*a+i[9]*r,this.z=i[2]*t+i[6]*a+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let a=this.length();return this.divideScalar(a||1).multiplyScalar(Math.max(e,Math.min(t,a)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,a){return this.x=e.x+(t.x-e.x)*a,this.y=e.y+(t.y-e.y)*a,this.z=e.z+(t.z-e.z)*a,this}cross(e,t){return t!==void 0?(console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(e,t)):this.crossVectors(this,e)}crossVectors(e,t){let a=e.x,r=e.y,i=e.z,s=t.x,l=t.y,u=t.z;return this.x=r*u-i*l,this.y=i*s-a*u,this.z=a*l-r*s,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let a=e.dot(this)/t;return this.copy(e).multiplyScalar(a)}projectOnPlane(e){return lm.copy(this).projectOnVector(e),this.sub(lm)}reflect(e){return this.sub(lm.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let a=this.dot(e)/t;return Math.acos(wn(a,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,a=this.y-e.y,r=this.z-e.z;return t*t+a*a+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,a){let r=Math.sin(t)*e;return this.x=r*Math.sin(a),this.y=Math.cos(t)*e,this.z=r*Math.cos(a),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,a){return this.x=e*Math.sin(t),this.y=a,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),a=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=a,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t,a){return a!==void 0&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}};D.prototype.isVector3=!0;var lm=new D,Db=new Gt,Mn=class{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){let t=1/0,a=1/0,r=1/0,i=-1/0,s=-1/0,l=-1/0;for(let u=0,d=e.length;u<d;u+=3){let f=e[u],p=e[u+1],c=e[u+2];f<t&&(t=f),p<a&&(a=p),c<r&&(r=c),f>i&&(i=f),p>s&&(s=p),c>l&&(l=c)}return this.min.set(t,a,r),this.max.set(i,s,l),this}setFromBufferAttribute(e){let t=1/0,a=1/0,r=1/0,i=-1/0,s=-1/0,l=-1/0;for(let u=0,d=e.count;u<d;u++){let f=e.getX(u),p=e.getY(u),c=e.getZ(u);f<t&&(t=f),p<a&&(a=p),c<r&&(r=c),f>i&&(i=f),p>s&&(s=p),c>l&&(l=c)}return this.min.set(t,a,r),this.max.set(i,s,l),this}setFromPoints(e){this.makeEmpty();for(let t=0,a=e.length;t<a;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let a=xl.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(a),this.max.copy(e).add(a),this}setFromObject(e){return this.makeEmpty(),this.expandByObject(e)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return e===void 0&&(console.warn("THREE.Box3: .getCenter() target is now required"),e=new D),this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return e===void 0&&(console.warn("THREE.Box3: .getSize() target is now required"),e=new D),this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e){e.updateWorldMatrix(!1,!1);let t=e.geometry;t!==void 0&&(t.boundingBox===null&&t.computeBoundingBox(),um.copy(t.boundingBox),um.applyMatrix4(e.matrixWorld),this.union(um));let a=e.children;for(let r=0,i=a.length;r<i;r++)this.expandByObject(a[r]);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t===void 0&&(console.warn("THREE.Box3: .getParameter() target is now required"),t=new D),t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,xl),xl.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,a;return e.normal.x>0?(t=e.normal.x*this.min.x,a=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,a=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,a+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,a+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,a+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,a+=e.normal.z*this.min.z),t<=-e.constant&&a>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vl),jd.subVectors(this.max,vl),Ss.subVectors(e.a,vl),Ms.subVectors(e.b,vl),_s.subVectors(e.c,vl),kr.subVectors(Ms,Ss),Nr.subVectors(_s,Ms),Ci.subVectors(Ss,_s);let t=[0,-kr.z,kr.y,0,-Nr.z,Nr.y,0,-Ci.z,Ci.y,kr.z,0,-kr.x,Nr.z,0,-Nr.x,Ci.z,0,-Ci.x,-kr.y,kr.x,0,-Nr.y,Nr.x,0,-Ci.y,Ci.x,0];return!dm(t,Ss,Ms,_s,jd)||(t=[1,0,0,0,1,0,0,0,1],!dm(t,Ss,Ms,_s,jd))?!1:(Xd.crossVectors(kr,Nr),t=[Xd.x,Xd.y,Xd.z],dm(t,Ss,Ms,_s,jd))}clampPoint(e,t){return t===void 0&&(console.warn("THREE.Box3: .clampPoint() target is now required"),t=new D),t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return xl.copy(e).clamp(this.min,this.max).sub(e).length()}getBoundingSphere(e){return e===void 0&&console.error("THREE.Box3: .getBoundingSphere() target is now required"),this.getCenter(e.center),e.radius=this.getSize(xl).length()*.5,e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ya[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ya[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ya[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ya[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ya[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ya[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ya[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ya[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ya),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}};Mn.prototype.isBox3=!0;var Ya=[new D,new D,new D,new D,new D,new D,new D,new D],xl=new D,um=new Mn,Ss=new D,Ms=new D,_s=new D,kr=new D,Nr=new D,Ci=new D,vl=new D,jd=new D,Xd=new D,Ei=new D;function dm(n,e,t,a,r){for(let i=0,s=n.length-3;i<=s;i+=3){Ei.fromArray(n,i);let l=r.x*Math.abs(Ei.x)+r.y*Math.abs(Ei.y)+r.z*Math.abs(Ei.z),u=e.dot(Ei),d=t.dot(Ei),f=a.dot(Ei);if(Math.max(-Math.max(u,d,f),Math.min(u,d,f))>l)return!1}return!0}var hL=new Mn,Fb=new D,cm=new D,fm=new D,Wr=class{constructor(e=new D,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let a=this.center;t!==void 0?a.copy(t):hL.setFromPoints(e).getCenter(a);let r=0;for(let i=0,s=e.length;i<s;i++)r=Math.max(r,a.distanceToSquared(e[i]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let a=this.center.distanceToSquared(e);return t===void 0&&(console.warn("THREE.Sphere: .clampPoint() target is now required"),t=new D),t.copy(e),a>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return e===void 0&&(console.warn("THREE.Sphere: .getBoundingBox() target is now required"),e=new Mn),this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){fm.subVectors(e,this.center);let t=fm.lengthSq();if(t>this.radius*this.radius){let a=Math.sqrt(t),r=(a-this.radius)*.5;this.center.add(fm.multiplyScalar(r/a)),this.radius+=r}return this}union(e){return cm.subVectors(e.center,this.center).normalize().multiplyScalar(e.radius),this.expandByPoint(Fb.copy(e.center).add(cm)),this.expandByPoint(Fb.copy(e.center).sub(cm)),this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Za=new D,pm=new D,Yd=new D,Pr=new D,hm=new D,Zd=new D,mm=new D,qr=class{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t===void 0&&(console.warn("THREE.Ray: .at() target is now required"),t=new D),t.copy(this.direction).multiplyScalar(e).add(this.origin)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Za)),this}closestPointToPoint(e,t){t===void 0&&(console.warn("THREE.Ray: .closestPointToPoint() target is now required"),t=new D),t.subVectors(e,this.origin);let a=t.dot(this.direction);return a<0?t.copy(this.origin):t.copy(this.direction).multiplyScalar(a).add(this.origin)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Za.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Za.copy(this.direction).multiplyScalar(t).add(this.origin),Za.distanceToSquared(e))}distanceSqToSegment(e,t,a,r){pm.copy(e).add(t).multiplyScalar(.5),Yd.copy(t).sub(e).normalize(),Pr.copy(this.origin).sub(pm);let i=e.distanceTo(t)*.5,s=-this.direction.dot(Yd),l=Pr.dot(this.direction),u=-Pr.dot(Yd),d=Pr.lengthSq(),f=Math.abs(1-s*s),p,c,m,g;if(f>0)if(p=s*u-l,c=s*l-u,g=i*f,p>=0)if(c>=-g)if(c<=g){let v=1/f;p*=v,c*=v,m=p*(p+s*c+2*l)+c*(s*p+c+2*u)+d}else c=i,p=Math.max(0,-(s*c+l)),m=-p*p+c*(c+2*u)+d;else c=-i,p=Math.max(0,-(s*c+l)),m=-p*p+c*(c+2*u)+d;else c<=-g?(p=Math.max(0,-(-s*i+l)),c=p>0?-i:Math.min(Math.max(-i,-u),i),m=-p*p+c*(c+2*u)+d):c<=g?(p=0,c=Math.min(Math.max(-i,-u),i),m=c*(c+2*u)+d):(p=Math.max(0,-(s*i+l)),c=p>0?i:Math.min(Math.max(-i,-u),i),m=-p*p+c*(c+2*u)+d);else c=s>0?-i:i,p=Math.max(0,-(s*c+l)),m=-p*p+c*(c+2*u)+d;return a&&a.copy(this.direction).multiplyScalar(p).add(this.origin),r&&r.copy(Yd).multiplyScalar(c).add(pm),m}intersectSphere(e,t){Za.subVectors(e.center,this.origin);let a=Za.dot(this.direction),r=Za.dot(Za)-a*a,i=e.radius*e.radius;if(r>i)return null;let s=Math.sqrt(i-r),l=a-s,u=a+s;return l<0&&u<0?null:l<0?this.at(u,t):this.at(l,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let a=-(this.origin.dot(e.normal)+e.constant)/t;return a>=0?a:null}intersectPlane(e,t){let a=this.distanceToPlane(e);return a===null?null:this.at(a,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let a,r,i,s,l,u,d=1/this.direction.x,f=1/this.direction.y,p=1/this.direction.z,c=this.origin;return d>=0?(a=(e.min.x-c.x)*d,r=(e.max.x-c.x)*d):(a=(e.max.x-c.x)*d,r=(e.min.x-c.x)*d),f>=0?(i=(e.min.y-c.y)*f,s=(e.max.y-c.y)*f):(i=(e.max.y-c.y)*f,s=(e.min.y-c.y)*f),a>s||i>r||((i>a||a!==a)&&(a=i),(s<r||r!==r)&&(r=s),p>=0?(l=(e.min.z-c.z)*p,u=(e.max.z-c.z)*p):(l=(e.max.z-c.z)*p,u=(e.min.z-c.z)*p),a>u||l>r)||((l>a||a!==a)&&(a=l),(u<r||r!==r)&&(r=u),r<0)?null:this.at(a>=0?a:r,t)}intersectsBox(e){return this.intersectBox(e,Za)!==null}intersectTriangle(e,t,a,r,i){hm.subVectors(t,e),Zd.subVectors(a,e),mm.crossVectors(hm,Zd);let s=this.direction.dot(mm),l;if(s>0){if(r)return null;l=1}else if(s<0)l=-1,s=-s;else return null;Pr.subVectors(this.origin,e);let u=l*this.direction.dot(Zd.crossVectors(Pr,Zd));if(u<0)return null;let d=l*this.direction.dot(hm.cross(Pr));if(d<0||u+d>s)return null;let f=-l*Pr.dot(mm);return f<0?null:this.at(f/s,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Fe=class n{constructor(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}set(e,t,a,r,i,s,l,u,d,f,p,c,m,g,v,w){let x=this.elements;return x[0]=e,x[4]=t,x[8]=a,x[12]=r,x[1]=i,x[5]=s,x[9]=l,x[13]=u,x[2]=d,x[6]=f,x[10]=p,x[14]=c,x[3]=m,x[7]=g,x[11]=v,x[15]=w,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,a=e.elements;return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[8]=a[8],t[9]=a[9],t[10]=a[10],t[11]=a[11],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15],this}copyPosition(e){let t=this.elements,a=e.elements;return t[12]=a[12],t[13]=a[13],t[14]=a[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,a){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),a.setFromMatrixColumn(this,2),this}makeBasis(e,t,a){return this.set(e.x,t.x,a.x,0,e.y,t.y,a.y,0,e.z,t.z,a.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,a=e.elements,r=1/Ls.setFromMatrixColumn(e,0).length(),i=1/Ls.setFromMatrixColumn(e,1).length(),s=1/Ls.setFromMatrixColumn(e,2).length();return t[0]=a[0]*r,t[1]=a[1]*r,t[2]=a[2]*r,t[3]=0,t[4]=a[4]*i,t[5]=a[5]*i,t[6]=a[6]*i,t[7]=0,t[8]=a[8]*s,t[9]=a[9]*s,t[10]=a[10]*s,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){e&&e.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");let t=this.elements,a=e.x,r=e.y,i=e.z,s=Math.cos(a),l=Math.sin(a),u=Math.cos(r),d=Math.sin(r),f=Math.cos(i),p=Math.sin(i);if(e.order==="XYZ"){let c=s*f,m=s*p,g=l*f,v=l*p;t[0]=u*f,t[4]=-u*p,t[8]=d,t[1]=m+g*d,t[5]=c-v*d,t[9]=-l*u,t[2]=v-c*d,t[6]=g+m*d,t[10]=s*u}else if(e.order==="YXZ"){let c=u*f,m=u*p,g=d*f,v=d*p;t[0]=c+v*l,t[4]=g*l-m,t[8]=s*d,t[1]=s*p,t[5]=s*f,t[9]=-l,t[2]=m*l-g,t[6]=v+c*l,t[10]=s*u}else if(e.order==="ZXY"){let c=u*f,m=u*p,g=d*f,v=d*p;t[0]=c-v*l,t[4]=-s*p,t[8]=g+m*l,t[1]=m+g*l,t[5]=s*f,t[9]=v-c*l,t[2]=-s*d,t[6]=l,t[10]=s*u}else if(e.order==="ZYX"){let c=s*f,m=s*p,g=l*f,v=l*p;t[0]=u*f,t[4]=g*d-m,t[8]=c*d+v,t[1]=u*p,t[5]=v*d+c,t[9]=m*d-g,t[2]=-d,t[6]=l*u,t[10]=s*u}else if(e.order==="YZX"){let c=s*u,m=s*d,g=l*u,v=l*d;t[0]=u*f,t[4]=v-c*p,t[8]=g*p+m,t[1]=p,t[5]=s*f,t[9]=-l*f,t[2]=-d*f,t[6]=m*p+g,t[10]=c-v*p}else if(e.order==="XZY"){let c=s*u,m=s*d,g=l*u,v=l*d;t[0]=u*f,t[4]=-p,t[8]=d*f,t[1]=c*p+v,t[5]=s*f,t[9]=m*p-g,t[2]=g*p-m,t[6]=l*f,t[10]=v*p+c}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(mL,e,gL)}lookAt(e,t,a){let r=this.elements;return kn.subVectors(e,t),kn.lengthSq()===0&&(kn.z=1),kn.normalize(),Dr.crossVectors(a,kn),Dr.lengthSq()===0&&(Math.abs(a.z)===1?kn.x+=1e-4:kn.z+=1e-4,kn.normalize(),Dr.crossVectors(a,kn)),Dr.normalize(),Jd.crossVectors(kn,Dr),r[0]=Dr.x,r[4]=Jd.x,r[8]=kn.x,r[1]=Dr.y,r[5]=Jd.y,r[9]=kn.y,r[2]=Dr.z,r[6]=Jd.z,r[10]=kn.z,this}multiply(e,t){return t!==void 0?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(e,t)):this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let a=e.elements,r=t.elements,i=this.elements,s=a[0],l=a[4],u=a[8],d=a[12],f=a[1],p=a[5],c=a[9],m=a[13],g=a[2],v=a[6],w=a[10],x=a[14],h=a[3],y=a[7],_=a[11],b=a[15],M=r[0],S=r[4],k=r[8],E=r[12],B=r[1],$=r[5],G=r[9],A=r[13],O=r[2],N=r[6],C=r[10],W=r[14],X=r[3],R=r[7],K=r[11],ne=r[15];return i[0]=s*M+l*B+u*O+d*X,i[4]=s*S+l*$+u*N+d*R,i[8]=s*k+l*G+u*C+d*K,i[12]=s*E+l*A+u*W+d*ne,i[1]=f*M+p*B+c*O+m*X,i[5]=f*S+p*$+c*N+m*R,i[9]=f*k+p*G+c*C+m*K,i[13]=f*E+p*A+c*W+m*ne,i[2]=g*M+v*B+w*O+x*X,i[6]=g*S+v*$+w*N+x*R,i[10]=g*k+v*G+w*C+x*K,i[14]=g*E+v*A+w*W+x*ne,i[3]=h*M+y*B+_*O+b*X,i[7]=h*S+y*$+_*N+b*R,i[11]=h*k+y*G+_*C+b*K,i[15]=h*E+y*A+_*W+b*ne,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],a=e[4],r=e[8],i=e[12],s=e[1],l=e[5],u=e[9],d=e[13],f=e[2],p=e[6],c=e[10],m=e[14],g=e[3],v=e[7],w=e[11],x=e[15];return g*(+i*u*p-r*d*p-i*l*c+a*d*c+r*l*m-a*u*m)+v*(+t*u*m-t*d*c+i*s*c-r*s*m+r*d*f-i*u*f)+w*(+t*d*p-t*l*m-i*s*p+a*s*m+i*l*f-a*d*f)+x*(-r*l*f-t*u*p+t*l*c+r*s*p-a*s*c+a*u*f)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,a){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=a),this}invert(){let e=this.elements,t=e[0],a=e[1],r=e[2],i=e[3],s=e[4],l=e[5],u=e[6],d=e[7],f=e[8],p=e[9],c=e[10],m=e[11],g=e[12],v=e[13],w=e[14],x=e[15],h=p*w*d-v*c*d+v*u*m-l*w*m-p*u*x+l*c*x,y=g*c*d-f*w*d-g*u*m+s*w*m+f*u*x-s*c*x,_=f*v*d-g*p*d+g*l*m-s*v*m-f*l*x+s*p*x,b=g*p*u-f*v*u-g*l*c+s*v*c+f*l*w-s*p*w,M=t*h+a*y+r*_+i*b;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let S=1/M;return e[0]=h*S,e[1]=(v*c*i-p*w*i-v*r*m+a*w*m+p*r*x-a*c*x)*S,e[2]=(l*w*i-v*u*i+v*r*d-a*w*d-l*r*x+a*u*x)*S,e[3]=(p*u*i-l*c*i-p*r*d+a*c*d+l*r*m-a*u*m)*S,e[4]=y*S,e[5]=(f*w*i-g*c*i+g*r*m-t*w*m-f*r*x+t*c*x)*S,e[6]=(g*u*i-s*w*i-g*r*d+t*w*d+s*r*x-t*u*x)*S,e[7]=(s*c*i-f*u*i+f*r*d-t*c*d-s*r*m+t*u*m)*S,e[8]=_*S,e[9]=(g*p*i-f*v*i-g*a*m+t*v*m+f*a*x-t*p*x)*S,e[10]=(s*v*i-g*l*i+g*a*d-t*v*d-s*a*x+t*l*x)*S,e[11]=(f*l*i-s*p*i-f*a*d+t*p*d+s*a*m-t*l*m)*S,e[12]=b*S,e[13]=(f*v*r-g*p*r+g*a*c-t*v*c-f*a*w+t*p*w)*S,e[14]=(g*l*r-s*v*r-g*a*u+t*v*u+s*a*w-t*l*w)*S,e[15]=(s*p*r-f*l*r+f*a*u-t*p*u-s*a*c+t*l*c)*S,this}scale(e){let t=this.elements,a=e.x,r=e.y,i=e.z;return t[0]*=a,t[4]*=r,t[8]*=i,t[1]*=a,t[5]*=r,t[9]*=i,t[2]*=a,t[6]*=r,t[10]*=i,t[3]*=a,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],a=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,a,r))}makeTranslation(e,t,a){return this.set(1,0,0,e,0,1,0,t,0,0,1,a,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),a=Math.sin(e);return this.set(1,0,0,0,0,t,-a,0,0,a,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),a=Math.sin(e);return this.set(t,0,a,0,0,1,0,0,-a,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),a=Math.sin(e);return this.set(t,-a,0,0,a,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let a=Math.cos(t),r=Math.sin(t),i=1-a,s=e.x,l=e.y,u=e.z,d=i*s,f=i*l;return this.set(d*s+a,d*l-r*u,d*u+r*l,0,d*l+r*u,f*l+a,f*u-r*s,0,d*u-r*l,f*u+r*s,i*u*u+a,0,0,0,0,1),this}makeScale(e,t,a){return this.set(e,0,0,0,0,t,0,0,0,0,a,0,0,0,0,1),this}makeShear(e,t,a){return this.set(1,t,a,0,e,1,a,0,e,t,1,0,0,0,0,1),this}compose(e,t,a){let r=this.elements,i=t._x,s=t._y,l=t._z,u=t._w,d=i+i,f=s+s,p=l+l,c=i*d,m=i*f,g=i*p,v=s*f,w=s*p,x=l*p,h=u*d,y=u*f,_=u*p,b=a.x,M=a.y,S=a.z;return r[0]=(1-(v+x))*b,r[1]=(m+_)*b,r[2]=(g-y)*b,r[3]=0,r[4]=(m-_)*M,r[5]=(1-(c+x))*M,r[6]=(w+h)*M,r[7]=0,r[8]=(g+y)*S,r[9]=(w-h)*S,r[10]=(1-(c+v))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,a){let r=this.elements,i=Ls.set(r[0],r[1],r[2]).length(),s=Ls.set(r[4],r[5],r[6]).length(),l=Ls.set(r[8],r[9],r[10]).length();this.determinant()<0&&(i=-i),e.x=r[12],e.y=r[13],e.z=r[14],sa.copy(this);let d=1/i,f=1/s,p=1/l;return sa.elements[0]*=d,sa.elements[1]*=d,sa.elements[2]*=d,sa.elements[4]*=f,sa.elements[5]*=f,sa.elements[6]*=f,sa.elements[8]*=p,sa.elements[9]*=p,sa.elements[10]*=p,t.setFromRotationMatrix(sa),a.x=i,a.y=s,a.z=l,this}makePerspective(e,t,a,r,i,s){s===void 0&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");let l=this.elements,u=2*i/(t-e),d=2*i/(a-r),f=(t+e)/(t-e),p=(a+r)/(a-r),c=-(s+i)/(s-i),m=-2*s*i/(s-i);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=c,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,a,r,i,s){let l=this.elements,u=1/(t-e),d=1/(a-r),f=1/(s-i),p=(t+e)*u,c=(a+r)*d,m=(s+i)*f;return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*d,l[9]=0,l[13]=-c,l[2]=0,l[6]=0,l[10]=-2*f,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,a=e.elements;for(let r=0;r<16;r++)if(t[r]!==a[r])return!1;return!0}fromArray(e,t=0){for(let a=0;a<16;a++)this.elements[a]=e[a+t];return this}toArray(e=[],t=0){let a=this.elements;return e[t]=a[0],e[t+1]=a[1],e[t+2]=a[2],e[t+3]=a[3],e[t+4]=a[4],e[t+5]=a[5],e[t+6]=a[6],e[t+7]=a[7],e[t+8]=a[8],e[t+9]=a[9],e[t+10]=a[10],e[t+11]=a[11],e[t+12]=a[12],e[t+13]=a[13],e[t+14]=a[14],e[t+15]=a[15],e}};Fe.prototype.isMatrix4=!0;var Ls=new D,sa=new Fe,mL=new D(0,0,0),gL=new D(1,1,1),Dr=new D,Jd=new D,kn=new D,Bb=new Fe,zb=new Gt,js=class n{constructor(e=0,t=0,a=0,r=n.DefaultOrder){this._x=e,this._y=t,this._z=a,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,a,r){return this._x=e,this._y=t,this._z=a,this._order=r||this._order,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t,a){let r=e.elements,i=r[0],s=r[4],l=r[8],u=r[1],d=r[5],f=r[9],p=r[2],c=r[6],m=r[10];switch(t=t||this._order,t){case"XYZ":this._y=Math.asin(wn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,m),this._z=Math.atan2(-s,i)):(this._x=Math.atan2(c,d),this._z=0);break;case"YXZ":this._x=Math.asin(-wn(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(l,m),this._z=Math.atan2(u,d)):(this._y=Math.atan2(-p,i),this._z=0);break;case"ZXY":this._x=Math.asin(wn(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-s,d)):(this._y=0,this._z=Math.atan2(u,i));break;case"ZYX":this._y=Math.asin(-wn(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(c,m),this._z=Math.atan2(u,i)):(this._x=0,this._z=Math.atan2(-s,d));break;case"YZX":this._z=Math.asin(wn(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-f,d),this._y=Math.atan2(-p,i)):(this._x=0,this._y=Math.atan2(l,m));break;case"XZY":this._z=Math.asin(-wn(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(c,d),this._y=Math.atan2(l,i)):(this._x=Math.atan2(-f,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,a!==!1&&this._onChangeCallback(),this}setFromQuaternion(e,t,a){return Bb.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bb,t,a)}setFromVector3(e,t){return this.set(e.x,e.y,e.z,t||this._order)}reorder(e){return zb.setFromEuler(this),this.setFromQuaternion(zb,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}toVector3(e){return e?e.set(this._x,this._y,this._z):new D(this._x,this._y,this._z)}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}};js.prototype.isEuler=!0;js.DefaultOrder="XYZ";js.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"];var qm=class{constructor(){this.mask=1}set(e){this.mask=1<<e|0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}},xL=0,Ob=new D,Cs=new Gt,Ja=new Fe,Qd=new D,yl=new D,vL=new D,yL=new Gt,Hb=new D(1,0,0),Ub=new D(0,1,0),Rb=new D(0,0,1),bL={type:"added"},Gb={type:"removed"},Xe=class n extends tr{constructor(){super(),Object.defineProperty(this,"id",{value:xL++}),this.uuid=ca(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DefaultUp.clone();let e=new D,t=new js,a=new Gt,r=new D(1,1,1);function i(){a.setFromEuler(t,!1)}function s(){t.setFromQuaternion(a,void 0,!1)}t._onChange(i),a._onChange(s),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:a},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Fe},normalMatrix:{value:new At}}),this.matrix=new Fe,this.matrixWorld=new Fe,this.matrixAutoUpdate=n.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.layers=new qm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Cs.setFromAxisAngle(e,t),this.quaternion.multiply(Cs),this}rotateOnWorldAxis(e,t){return Cs.setFromAxisAngle(e,t),this.quaternion.premultiply(Cs),this}rotateX(e){return this.rotateOnAxis(Hb,e)}rotateY(e){return this.rotateOnAxis(Ub,e)}rotateZ(e){return this.rotateOnAxis(Rb,e)}translateOnAxis(e,t){return Ob.copy(e).applyQuaternion(this.quaternion),this.position.add(Ob.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Hb,e)}translateY(e){return this.translateOnAxis(Ub,e)}translateZ(e){return this.translateOnAxis(Rb,e)}localToWorld(e){return e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return e.applyMatrix4(Ja.copy(this.matrixWorld).invert())}lookAt(e,t,a){e.isVector3?Qd.copy(e):Qd.set(e,t,a);let r=this.parent;this.updateWorldMatrix(!0,!1),yl.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ja.lookAt(yl,Qd,this.up):Ja.lookAt(Qd,yl,this.up),this.quaternion.setFromRotationMatrix(Ja),r&&(Ja.extractRotation(r.matrixWorld),Cs.setFromRotationMatrix(Ja),this.quaternion.premultiply(Cs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(bL)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let a=0;a<arguments.length;a++)this.remove(arguments[a]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Gb)),this}clear(){for(let e=0;e<this.children.length;e++){let t=this.children[e];t.parent=null,t.dispatchEvent(Gb)}return this.children.length=0,this}attach(e){return this.updateWorldMatrix(!0,!1),Ja.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ja.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ja),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let a=0,r=this.children.length;a<r;a++){let s=this.children[a].getObjectByProperty(e,t);if(s!==void 0)return s}}getWorldPosition(e){return e===void 0&&(console.warn("THREE.Object3D: .getWorldPosition() target is now required"),e=new D),this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return e===void 0&&(console.warn("THREE.Object3D: .getWorldQuaternion() target is now required"),e=new Gt),this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yl,e,vL),e}getWorldScale(e){return e===void 0&&(console.warn("THREE.Object3D: .getWorldScale() target is now required"),e=new D),this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yl,yL,e),e}getWorldDirection(e){e===void 0&&(console.warn("THREE.Object3D: .getWorldDirection() target is now required"),e=new D),this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let a=0,r=t.length;a<r;a++)t[a].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let a=0,r=t.length;a<r;a++)t[a].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let a=0,r=t.length;a<r;a++)t[a].updateMatrixWorld(e)}updateWorldMatrix(e,t){let a=this.parent;if(e===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){let r=this.children;for(let i=0,s=r.length;i<s;i++)r[i].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",a={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{}},a.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),JSON.stringify(this.userData)!=="{}"&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON()));function i(l,u){return l[u.uuid]===void 0&&(l[u.uuid]=u.toJSON(e)),u.uuid}if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){let u=l.shapes;if(Array.isArray(u))for(let d=0,f=u.length;d<f;d++){let p=u[d];i(e.shapes,p)}else i(e.shapes,u)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let l=[];for(let u=0,d=this.material.length;u<d;u++)l.push(i(e.materials,this.material[u]));r.material=l}else r.material=i(e.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){let u=this.animations[l];r.animations.push(i(e.animations,u))}}if(t){let l=s(e.geometries),u=s(e.materials),d=s(e.textures),f=s(e.images),p=s(e.shapes),c=s(e.skeletons),m=s(e.animations);l.length>0&&(a.geometries=l),u.length>0&&(a.materials=u),d.length>0&&(a.textures=d),f.length>0&&(a.images=f),p.length>0&&(a.shapes=p),c.length>0&&(a.skeletons=c),m.length>0&&(a.animations=m)}return a.object=r,a;function s(l){let u=[];for(let d in l){let f=l[d];delete f.metadata,u.push(f)}return u}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let a=0;a<e.children.length;a++){let r=e.children[a];this.add(r.clone())}return this}};Xe.DefaultUp=new D(0,1,0);Xe.DefaultMatrixAutoUpdate=!0;Xe.prototype.isObject3D=!0;var gm=new D,wL=new D,SL=new At,Vn=class{constructor(e=new D(1,0,0),t=0){this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,a,r){return this.normal.set(e,t,a),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,a){let r=gm.subVectors(a,t).cross(wL.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t===void 0&&(console.warn("THREE.Plane: .projectPoint() target is now required"),t=new D),t.copy(this.normal).multiplyScalar(-this.distanceToPoint(e)).add(e)}intersectLine(e,t){t===void 0&&(console.warn("THREE.Plane: .intersectLine() target is now required"),t=new D);let a=e.delta(gm),r=this.normal.dot(a);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let i=-(e.start.dot(this.normal)+this.constant)/r;return i<0||i>1?null:t.copy(a).multiplyScalar(i).add(e.start)}intersectsLine(e){let t=this.distanceToPoint(e.start),a=this.distanceToPoint(e.end);return t<0&&a>0||a<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e===void 0&&(console.warn("THREE.Plane: .coplanarPoint() target is now required"),e=new D),e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let a=t||SL.getNormalMatrix(e),r=this.coplanarPoint(gm).applyMatrix4(e),i=this.normal.applyMatrix3(a).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}};Vn.prototype.isPlane=!0;var oa=new D,Qa=new D,xm=new D,Ka=new D,Es=new D,Is=new D,Vb=new D,vm=new D,ym=new D,bm=new D,Qt=class n{constructor(e=new D,t=new D,a=new D){this.a=e,this.b=t,this.c=a}static getNormal(e,t,a,r){r===void 0&&(console.warn("THREE.Triangle: .getNormal() target is now required"),r=new D),r.subVectors(a,t),oa.subVectors(e,t),r.cross(oa);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,a,r,i){oa.subVectors(r,t),Qa.subVectors(a,t),xm.subVectors(e,t);let s=oa.dot(oa),l=oa.dot(Qa),u=oa.dot(xm),d=Qa.dot(Qa),f=Qa.dot(xm),p=s*d-l*l;if(i===void 0&&(console.warn("THREE.Triangle: .getBarycoord() target is now required"),i=new D),p===0)return i.set(-2,-1,-1);let c=1/p,m=(d*u-l*f)*c,g=(s*f-l*u)*c;return i.set(1-m-g,g,m)}static containsPoint(e,t,a,r){return this.getBarycoord(e,t,a,r,Ka),Ka.x>=0&&Ka.y>=0&&Ka.x+Ka.y<=1}static getUV(e,t,a,r,i,s,l,u){return this.getBarycoord(e,t,a,r,Ka),u.set(0,0),u.addScaledVector(i,Ka.x),u.addScaledVector(s,Ka.y),u.addScaledVector(l,Ka.z),u}static isFrontFacing(e,t,a,r){return oa.subVectors(a,t),Qa.subVectors(e,t),oa.cross(Qa).dot(r)<0}set(e,t,a){return this.a.copy(e),this.b.copy(t),this.c.copy(a),this}setFromPointsAndIndices(e,t,a,r){return this.a.copy(e[t]),this.b.copy(e[a]),this.c.copy(e[r]),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return oa.subVectors(this.c,this.b),Qa.subVectors(this.a,this.b),oa.cross(Qa).length()*.5}getMidpoint(e){return e===void 0&&(console.warn("THREE.Triangle: .getMidpoint() target is now required"),e=new D),e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e===void 0&&(console.warn("THREE.Triangle: .getPlane() target is now required"),e=new Vn),e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,a,r,i){return n.getUV(e,this.a,this.b,this.c,t,a,r,i)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){t===void 0&&(console.warn("THREE.Triangle: .closestPointToPoint() target is now required"),t=new D);let a=this.a,r=this.b,i=this.c,s,l;Es.subVectors(r,a),Is.subVectors(i,a),vm.subVectors(e,a);let u=Es.dot(vm),d=Is.dot(vm);if(u<=0&&d<=0)return t.copy(a);ym.subVectors(e,r);let f=Es.dot(ym),p=Is.dot(ym);if(f>=0&&p<=f)return t.copy(r);let c=u*p-f*d;if(c<=0&&u>=0&&f<=0)return s=u/(u-f),t.copy(a).addScaledVector(Es,s);bm.subVectors(e,i);let m=Es.dot(bm),g=Is.dot(bm);if(g>=0&&m<=g)return t.copy(i);let v=m*d-u*g;if(v<=0&&d>=0&&g<=0)return l=d/(d-g),t.copy(a).addScaledVector(Is,l);let w=f*g-m*p;if(w<=0&&p-f>=0&&m-g>=0)return Vb.subVectors(i,r),l=(p-f)/(p-f+(m-g)),t.copy(r).addScaledVector(Vb,l);let x=1/(w+v+c);return s=v*x,l=c*x,t.copy(a).addScaledVector(Es,s).addScaledVector(Is,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ML=0;function Bt(){Object.defineProperty(this,"id",{value:ML++}),this.uuid=ca(),this.name="",this.type="Material",this.fog=!0,this.blending=Al,this.side=sf,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=U1,this.blendDst=R1,this.blendEquation=Us,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=Um,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uL,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=rm,this.stencilZFail=rm,this.stencilZPass=rm,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaTest=0,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0}Bt.prototype=Object.assign(Object.create(tr.prototype),{constructor:Bt,isMaterial:!0,onBuild:function(){},onBeforeCompile:function(){},customProgramCacheKey:function(){return this.onBeforeCompile.toString()},setValues:function(n){if(n!==void 0)for(let e in n){let t=n[e];if(t===void 0){console.warn("THREE.Material: '"+e+"' parameter is undefined.");continue}if(e==="shading"){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=t===H1;continue}let a=this[e];if(a===void 0){console.warn("THREE."+this.type+": '"+e+"' is not a property of this material.");continue}a&&a.isColor?a.set(t):a&&a.isVector3&&t&&t.isVector3?a.copy(t):this[e]=t}},toJSON:function(n){let e=n===void 0||typeof n=="string";e&&(n={textures:{},images:{}});let t={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),this.color&&this.color.isColor&&(t.color=this.color.getHex()),this.roughness!==void 0&&(t.roughness=this.roughness),this.metalness!==void 0&&(t.metalness=this.metalness),this.sheen&&this.sheen.isColor&&(t.sheen=this.sheen.getHex()),this.emissive&&this.emissive.isColor&&(t.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(t.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(t.specular=this.specular.getHex()),this.shininess!==void 0&&(t.shininess=this.shininess),this.clearcoat!==void 0&&(t.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(t.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(t.clearcoatMap=this.clearcoatMap.toJSON(n).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(t.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(n).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(t.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(n).uuid,t.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.map&&this.map.isTexture&&(t.map=this.map.toJSON(n).uuid),this.matcap&&this.matcap.isTexture&&(t.matcap=this.matcap.toJSON(n).uuid),this.alphaMap&&this.alphaMap.isTexture&&(t.alphaMap=this.alphaMap.toJSON(n).uuid),this.lightMap&&this.lightMap.isTexture&&(t.lightMap=this.lightMap.toJSON(n).uuid,t.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(t.aoMap=this.aoMap.toJSON(n).uuid,t.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(t.bumpMap=this.bumpMap.toJSON(n).uuid,t.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(t.normalMap=this.normalMap.toJSON(n).uuid,t.normalMapType=this.normalMapType,t.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(t.displacementMap=this.displacementMap.toJSON(n).uuid,t.displacementScale=this.displacementScale,t.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(t.roughnessMap=this.roughnessMap.toJSON(n).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(t.metalnessMap=this.metalnessMap.toJSON(n).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(t.emissiveMap=this.emissiveMap.toJSON(n).uuid),this.specularMap&&this.specularMap.isTexture&&(t.specularMap=this.specularMap.toJSON(n).uuid),this.envMap&&this.envMap.isTexture&&(t.envMap=this.envMap.toJSON(n).uuid,this.combine!==void 0&&(t.combine=this.combine)),this.envMapIntensity!==void 0&&(t.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(t.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(t.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(t.gradientMap=this.gradientMap.toJSON(n).uuid),this.size!==void 0&&(t.size=this.size),this.shadowSide!==null&&(t.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(t.sizeAttenuation=this.sizeAttenuation),this.blending!==Al&&(t.blending=this.blending),this.side!==sf&&(t.side=this.side),this.vertexColors&&(t.vertexColors=!0),this.opacity<1&&(t.opacity=this.opacity),this.transparent===!0&&(t.transparent=this.transparent),t.depthFunc=this.depthFunc,t.depthTest=this.depthTest,t.depthWrite=this.depthWrite,t.colorWrite=this.colorWrite,t.stencilWrite=this.stencilWrite,t.stencilWriteMask=this.stencilWriteMask,t.stencilFunc=this.stencilFunc,t.stencilRef=this.stencilRef,t.stencilFuncMask=this.stencilFuncMask,t.stencilFail=this.stencilFail,t.stencilZFail=this.stencilZFail,t.stencilZPass=this.stencilZPass,this.rotation&&this.rotation!==0&&(t.rotation=this.rotation),this.polygonOffset===!0&&(t.polygonOffset=!0),this.polygonOffsetFactor!==0&&(t.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(t.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth&&this.linewidth!==1&&(t.linewidth=this.linewidth),this.dashSize!==void 0&&(t.dashSize=this.dashSize),this.gapSize!==void 0&&(t.gapSize=this.gapSize),this.scale!==void 0&&(t.scale=this.scale),this.dithering===!0&&(t.dithering=!0),this.alphaTest>0&&(t.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(t.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(t.premultipliedAlpha=this.premultipliedAlpha),this.wireframe===!0&&(t.wireframe=this.wireframe),this.wireframeLinewidth>1&&(t.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(t.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(t.wireframeLinejoin=this.wireframeLinejoin),this.morphTargets===!0&&(t.morphTargets=!0),this.morphNormals===!0&&(t.morphNormals=!0),this.skinning===!0&&(t.skinning=!0),this.flatShading===!0&&(t.flatShading=this.flatShading),this.visible===!1&&(t.visible=!1),this.toneMapped===!1&&(t.toneMapped=!1),JSON.stringify(this.userData)!=="{}"&&(t.userData=this.userData);function a(r){let i=[];for(let s in r){let l=r[s];delete l.metadata,i.push(l)}return i}if(e){let r=a(n.textures),i=a(n.images);r.length>0&&(t.textures=r),i.length>0&&(t.images=i)}return t},clone:function(){return new this.constructor().copy(this)},copy:function(n){this.name=n.name,this.fog=n.fog,this.blending=n.blending,this.side=n.side,this.vertexColors=n.vertexColors,this.opacity=n.opacity,this.transparent=n.transparent,this.blendSrc=n.blendSrc,this.blendDst=n.blendDst,this.blendEquation=n.blendEquation,this.blendSrcAlpha=n.blendSrcAlpha,this.blendDstAlpha=n.blendDstAlpha,this.blendEquationAlpha=n.blendEquationAlpha,this.depthFunc=n.depthFunc,this.depthTest=n.depthTest,this.depthWrite=n.depthWrite,this.stencilWriteMask=n.stencilWriteMask,this.stencilFunc=n.stencilFunc,this.stencilRef=n.stencilRef,this.stencilFuncMask=n.stencilFuncMask,this.stencilFail=n.stencilFail,this.stencilZFail=n.stencilZFail,this.stencilZPass=n.stencilZPass,this.stencilWrite=n.stencilWrite;let e=n.clippingPlanes,t=null;if(e!==null){let a=e.length;t=new Array(a);for(let r=0;r!==a;++r)t[r]=e[r].clone()}return this.clippingPlanes=t,this.clipIntersection=n.clipIntersection,this.clipShadows=n.clipShadows,this.shadowSide=n.shadowSide,this.colorWrite=n.colorWrite,this.precision=n.precision,this.polygonOffset=n.polygonOffset,this.polygonOffsetFactor=n.polygonOffsetFactor,this.polygonOffsetUnits=n.polygonOffsetUnits,this.dithering=n.dithering,this.alphaTest=n.alphaTest,this.alphaToCoverage=n.alphaToCoverage,this.premultipliedAlpha=n.premultipliedAlpha,this.visible=n.visible,this.toneMapped=n.toneMapped,this.userData=JSON.parse(JSON.stringify(n.userData)),this},dispose:function(){this.dispatchEvent({type:"dispose"})}});Object.defineProperty(Bt.prototype,"needsUpdate",{set:function(n){n===!0&&this.version++}});var j1={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},la={h:0,s:0,l:0},Kd={h:0,s:0,l:0};function wm(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}function Sm(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Mm(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Ce=class{constructor(e,t,a){return t===void 0&&a===void 0?this.set(e):this.setRGB(e,t,a)}set(e){return e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,this}setRGB(e,t,a){return this.r=e,this.g=t,this.b=a,this}setHSL(e,t,a){if(e=dL(e,1),t=wn(t,0,1),a=wn(a,0,1),t===0)this.r=this.g=this.b=a;else{let r=a<=.5?a*(1+t):a+t-a*t,i=2*a-r;this.r=wm(i,r,e+1/3),this.g=wm(i,r,e),this.b=wm(i,r,e-1/3)}return this}setStyle(e){function t(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^((?:rgb|hsl)a?)\(([^\)]*)\)/.exec(e)){let r,i=a[1],s=a[2];switch(i){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return this.r=Math.min(255,parseInt(r[1],10))/255,this.g=Math.min(255,parseInt(r[2],10))/255,this.b=Math.min(255,parseInt(r[3],10))/255,t(r[4]),this;if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return this.r=Math.min(100,parseInt(r[1],10))/100,this.g=Math.min(100,parseInt(r[2],10))/100,this.b=Math.min(100,parseInt(r[3],10))/100,t(r[4]),this;break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)){let l=parseFloat(r[1])/360,u=parseInt(r[2],10)/100,d=parseInt(r[3],10)/100;return t(r[4]),this.setHSL(l,u,d)}break}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=a[1],i=r.length;if(i===3)return this.r=parseInt(r.charAt(0)+r.charAt(0),16)/255,this.g=parseInt(r.charAt(1)+r.charAt(1),16)/255,this.b=parseInt(r.charAt(2)+r.charAt(2),16)/255,this;if(i===6)return this.r=parseInt(r.charAt(0)+r.charAt(1),16)/255,this.g=parseInt(r.charAt(2)+r.charAt(3),16)/255,this.b=parseInt(r.charAt(4)+r.charAt(5),16)/255,this}return e&&e.length>0?this.setColorName(e):this}setColorName(e){let t=j1[e.toLowerCase()];return t!==void 0?this.setHex(t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copyGammaToLinear(e,t=2){return this.r=Math.pow(e.r,t),this.g=Math.pow(e.g,t),this.b=Math.pow(e.b,t),this}copyLinearToGamma(e,t=2){let a=t>0?1/t:1;return this.r=Math.pow(e.r,a),this.g=Math.pow(e.g,a),this.b=Math.pow(e.b,a),this}convertGammaToLinear(e){return this.copyGammaToLinear(this,e),this}convertLinearToGamma(e){return this.copyLinearToGamma(this,e),this}copySRGBToLinear(e){return this.r=Sm(e.r),this.g=Sm(e.g),this.b=Sm(e.b),this}copyLinearToSRGB(e){return this.r=Mm(e.r),this.g=Mm(e.g),this.b=Mm(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(){return this.r*255<<16^this.g*255<<8^this.b*255<<0}getHexString(){return("000000"+this.getHex().toString(16)).slice(-6)}getHSL(e){e===void 0&&(console.warn("THREE.Color: .getHSL() target is now required"),e={h:0,s:0,l:0});let t=this.r,a=this.g,r=this.b,i=Math.max(t,a,r),s=Math.min(t,a,r),l,u,d=(s+i)/2;if(s===i)l=0,u=0;else{let f=i-s;switch(u=d<=.5?f/(i+s):f/(2-i-s),i){case t:l=(a-r)/f+(a<r?6:0);break;case a:l=(r-t)/f+2;break;case r:l=(t-a)/f+4;break}l/=6}return e.h=l,e.s=u,e.l=d,e}getStyle(){return"rgb("+(this.r*255|0)+","+(this.g*255|0)+","+(this.b*255|0)+")"}offsetHSL(e,t,a){return this.getHSL(la),la.h+=e,la.s+=t,la.l+=a,this.setHSL(la.h,la.s,la.l),this}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,a){return this.r=e.r+(t.r-e.r)*a,this.g=e.g+(t.g-e.g)*a,this.b=e.b+(t.b-e.b)*a,this}lerpHSL(e,t){this.getHSL(la),e.getHSL(Kd);let a=sm(la.h,Kd.h,t),r=sm(la.s,Kd.s,t),i=sm(la.l,Kd.l,t);return this.setHSL(a,r,i),this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),e.normalized===!0&&(this.r/=255,this.g/=255,this.b/=255),this}toJSON(){return this.getHex()}};Ce.NAMES=j1;Ce.prototype.isColor=!0;Ce.prototype.r=1;Ce.prototype.g=1;Ce.prototype.b=1;var $r=class extends Bt{constructor(e){super(),this.type="MeshBasicMaterial",this.color=new Ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=lf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this}};$r.prototype.isMeshBasicMaterial=!0;var rt=new D,ec=new le,vt=class{constructor(e,t,a){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=a===!0,this.usage=Bl,this.updateRange={offset:0,count:-1},this.version=0,this.onUploadCallback=function(){}}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this}copyAt(e,t,a){e*=this.itemSize,a*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[a+r];return this}copyArray(e){return this.array.set(e),this}copyColorsArray(e){let t=this.array,a=0;for(let r=0,i=e.length;r<i;r++){let s=e[r];s===void 0&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",r),s=new Ce),t[a++]=s.r,t[a++]=s.g,t[a++]=s.b}return this}copyVector2sArray(e){let t=this.array,a=0;for(let r=0,i=e.length;r<i;r++){let s=e[r];s===void 0&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",r),s=new le),t[a++]=s.x,t[a++]=s.y}return this}copyVector3sArray(e){let t=this.array,a=0;for(let r=0,i=e.length;r<i;r++){let s=e[r];s===void 0&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",r),s=new D),t[a++]=s.x,t[a++]=s.y,t[a++]=s.z}return this}copyVector4sArray(e){let t=this.array,a=0;for(let r=0,i=e.length;r<i;r++){let s=e[r];s===void 0&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",r),s=new Ye),t[a++]=s.x,t[a++]=s.y,t[a++]=s.z,t[a++]=s.w}return this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,a=this.count;t<a;t++)ec.fromBufferAttribute(this,t),ec.applyMatrix3(e),this.setXY(t,ec.x,ec.y);else if(this.itemSize===3)for(let t=0,a=this.count;t<a;t++)rt.fromBufferAttribute(this,t),rt.applyMatrix3(e),this.setXYZ(t,rt.x,rt.y,rt.z);return this}applyMatrix4(e){for(let t=0,a=this.count;t<a;t++)rt.x=this.getX(t),rt.y=this.getY(t),rt.z=this.getZ(t),rt.applyMatrix4(e),this.setXYZ(t,rt.x,rt.y,rt.z);return this}applyNormalMatrix(e){for(let t=0,a=this.count;t<a;t++)rt.x=this.getX(t),rt.y=this.getY(t),rt.z=this.getZ(t),rt.applyNormalMatrix(e),this.setXYZ(t,rt.x,rt.y,rt.z);return this}transformDirection(e){for(let t=0,a=this.count;t<a;t++)rt.x=this.getX(t),rt.y=this.getY(t),rt.z=this.getZ(t),rt.transformDirection(e),this.setXYZ(t,rt.x,rt.y,rt.z);return this}set(e,t=0){return this.array.set(e,t),this}getX(e){return this.array[e*this.itemSize]}setX(e,t){return this.array[e*this.itemSize]=t,this}getY(e){return this.array[e*this.itemSize+1]}setY(e,t){return this.array[e*this.itemSize+1]=t,this}getZ(e){return this.array[e*this.itemSize+2]}setZ(e,t){return this.array[e*this.itemSize+2]=t,this}getW(e){return this.array[e*this.itemSize+3]}setW(e,t){return this.array[e*this.itemSize+3]=t,this}setXY(e,t,a){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=a,this}setXYZ(e,t,a,r){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=a,this.array[e+2]=r,this}setXYZW(e,t,a,r,i){return e*=this.itemSize,this.array[e+0]=t,this.array[e+1]=a,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.prototype.slice.call(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Bl&&(e.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(e.updateRange=this.updateRange),e}};vt.prototype.isBufferAttribute=!0;var Pc=class extends vt{constructor(e,t,a){super(new Uint16Array(e),t,a)}};var Dc=class extends vt{constructor(e,t,a){super(new Uint32Array(e),t,a)}},$m=class extends vt{constructor(e,t,a){super(new Uint16Array(e),t,a)}};$m.prototype.isFloat16BufferAttribute=!0;var it=class extends vt{constructor(e,t,a){super(new Float32Array(e),t,a)}};function X1(n){if(n.length===0)return-1/0;let e=n[0];for(let t=1,a=n.length;t<a;++t)n[t]>e&&(e=n[t]);return e}var _L=0,Ma=new Fe,_m=new Xe,Ts=new D,Nn=new Mn,bl=new Mn,Pt=new D,et=class n extends tr{constructor(){super(),Object.defineProperty(this,"id",{value:_L++}),this.uuid=ca(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(X1(e)>65535?Dc:Pc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,a=0){this.groups.push({start:e,count:t,materialIndex:a})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let a=this.attributes.normal;if(a!==void 0){let i=new At().getNormalMatrix(e);a.applyNormalMatrix(i),a.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}rotateX(e){return Ma.makeRotationX(e),this.applyMatrix4(Ma),this}rotateY(e){return Ma.makeRotationY(e),this.applyMatrix4(Ma),this}rotateZ(e){return Ma.makeRotationZ(e),this.applyMatrix4(Ma),this}translate(e,t,a){return Ma.makeTranslation(e,t,a),this.applyMatrix4(Ma),this}scale(e,t,a){return Ma.makeScale(e,t,a),this.applyMatrix4(Ma),this}lookAt(e){return _m.lookAt(e),_m.updateMatrix(),this.applyMatrix4(_m.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ts).negate(),this.translate(Ts.x,Ts.y,Ts.z),this}setFromPoints(e){let t=[];for(let a=0,r=e.length;a<r;a++){let i=e[a];t.push(i.x,i.y,i.z||0)}return this.setAttribute("position",new it(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let a=0,r=t.length;a<r;a++){let i=t[a];Nn.setFromBufferAttribute(i),this.morphTargetsRelative?(Pt.addVectors(this.boundingBox.min,Nn.min),this.boundingBox.expandByPoint(Pt),Pt.addVectors(this.boundingBox.max,Nn.max),this.boundingBox.expandByPoint(Pt)):(this.boundingBox.expandByPoint(Nn.min),this.boundingBox.expandByPoint(Nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new D,1/0);return}if(e){let a=this.boundingSphere.center;if(Nn.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let l=t[i];bl.setFromBufferAttribute(l),this.morphTargetsRelative?(Pt.addVectors(Nn.min,bl.min),Nn.expandByPoint(Pt),Pt.addVectors(Nn.max,bl.max),Nn.expandByPoint(Pt)):(Nn.expandByPoint(bl.min),Nn.expandByPoint(bl.max))}Nn.getCenter(a);let r=0;for(let i=0,s=e.count;i<s;i++)Pt.fromBufferAttribute(e,i),r=Math.max(r,a.distanceToSquared(Pt));if(t)for(let i=0,s=t.length;i<s;i++){let l=t[i],u=this.morphTargetsRelative;for(let d=0,f=l.count;d<f;d++)Pt.fromBufferAttribute(l,d),u&&(Ts.fromBufferAttribute(e,d),Pt.add(Ts)),r=Math.max(r,a.distanceToSquared(Pt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeFaceNormals(){}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let a=e.array,r=t.position.array,i=t.normal.array,s=t.uv.array,l=r.length/3;t.tangent===void 0&&this.setAttribute("tangent",new vt(new Float32Array(4*l),4));let u=t.tangent.array,d=[],f=[];for(let B=0;B<l;B++)d[B]=new D,f[B]=new D;let p=new D,c=new D,m=new D,g=new le,v=new le,w=new le,x=new D,h=new D;function y(B,$,G){p.fromArray(r,B*3),c.fromArray(r,$*3),m.fromArray(r,G*3),g.fromArray(s,B*2),v.fromArray(s,$*2),w.fromArray(s,G*2),c.sub(p),m.sub(p),v.sub(g),w.sub(g);let A=1/(v.x*w.y-w.x*v.y);isFinite(A)&&(x.copy(c).multiplyScalar(w.y).addScaledVector(m,-v.y).multiplyScalar(A),h.copy(m).multiplyScalar(v.x).addScaledVector(c,-w.x).multiplyScalar(A),d[B].add(x),d[$].add(x),d[G].add(x),f[B].add(h),f[$].add(h),f[G].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:a.length}]);for(let B=0,$=_.length;B<$;++B){let G=_[B],A=G.start,O=G.count;for(let N=A,C=A+O;N<C;N+=3)y(a[N+0],a[N+1],a[N+2])}let b=new D,M=new D,S=new D,k=new D;function E(B){S.fromArray(i,B*3),k.copy(S);let $=d[B];b.copy($),b.sub(S.multiplyScalar(S.dot($))).normalize(),M.crossVectors(k,$);let A=M.dot(f[B])<0?-1:1;u[B*4]=b.x,u[B*4+1]=b.y,u[B*4+2]=b.z,u[B*4+3]=A}for(let B=0,$=_.length;B<$;++B){let G=_[B],A=G.start,O=G.count;for(let N=A,C=A+O;N<C;N+=3)E(a[N+0]),E(a[N+1]),E(a[N+2])}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let a=this.getAttribute("normal");if(a===void 0)a=new vt(new Float32Array(t.count*3),3),this.setAttribute("normal",a);else for(let c=0,m=a.count;c<m;c++)a.setXYZ(c,0,0,0);let r=new D,i=new D,s=new D,l=new D,u=new D,d=new D,f=new D,p=new D;if(e)for(let c=0,m=e.count;c<m;c+=3){let g=e.getX(c+0),v=e.getX(c+1),w=e.getX(c+2);r.fromBufferAttribute(t,g),i.fromBufferAttribute(t,v),s.fromBufferAttribute(t,w),f.subVectors(s,i),p.subVectors(r,i),f.cross(p),l.fromBufferAttribute(a,g),u.fromBufferAttribute(a,v),d.fromBufferAttribute(a,w),l.add(f),u.add(f),d.add(f),a.setXYZ(g,l.x,l.y,l.z),a.setXYZ(v,u.x,u.y,u.z),a.setXYZ(w,d.x,d.y,d.z)}else for(let c=0,m=t.count;c<m;c+=3)r.fromBufferAttribute(t,c+0),i.fromBufferAttribute(t,c+1),s.fromBufferAttribute(t,c+2),f.subVectors(s,i),p.subVectors(r,i),f.cross(p),a.setXYZ(c+0,f.x,f.y,f.z),a.setXYZ(c+1,f.x,f.y,f.z),a.setXYZ(c+2,f.x,f.y,f.z);this.normalizeNormals(),a.needsUpdate=!0}}merge(e,t){if(!(e&&e.isBufferGeometry)){console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",e);return}t===void 0&&(t=0,console.warn("THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge."));let a=this.attributes;for(let r in a){if(e.attributes[r]===void 0)continue;let s=a[r].array,l=e.attributes[r],u=l.array,d=l.itemSize*t,f=Math.min(u.length,s.length-d);for(let p=0,c=d;p<f;p++,c++)s[c]=u[p]}return this}normalizeNormals(){let e=this.attributes.normal;for(let t=0,a=e.count;t<a;t++)Pt.fromBufferAttribute(e,t),Pt.normalize(),e.setXYZ(t,Pt.x,Pt.y,Pt.z)}toNonIndexed(){function e(l,u){let d=l.array,f=l.itemSize,p=l.normalized,c=new d.constructor(u.length*f),m=0,g=0;for(let v=0,w=u.length;v<w;v++){m=u[v]*f;for(let x=0;x<f;x++)c[g++]=d[m++]}return new vt(c,f,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,a=this.index.array,r=this.attributes;for(let l in r){let u=r[l],d=e(u,a);t.setAttribute(l,d)}let i=this.morphAttributes;for(let l in i){let u=[],d=i[l];for(let f=0,p=d.length;f<p;f++){let c=d[f],m=e(c,a);u.push(m)}t.morphAttributes[l]=u}t.morphTargetsRelative=this.morphTargetsRelative;let s=this.groups;for(let l=0,u=s.length;l<u;l++){let d=s[l];t.addGroup(d.start,d.count,d.materialIndex)}return t}toJSON(){let e={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let u=this.parameters;for(let d in u)u[d]!==void 0&&(e[d]=u[d]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let a=this.attributes;for(let u in a){let d=a[u];e.data.attributes[u]=d.toJSON(e.data)}let r={},i=!1;for(let u in this.morphAttributes){let d=this.morphAttributes[u],f=[];for(let p=0,c=d.length;p<c;p++){let m=d[p];f.push(m.toJSON(e.data))}f.length>0&&(r[u]=f,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let s=this.groups;s.length>0&&(e.data.groups=JSON.parse(JSON.stringify(s)));let l=this.boundingSphere;return l!==null&&(e.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),e}clone(){return new n().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let a=e.index;a!==null&&this.setIndex(a.clone(t));let r=e.attributes;for(let d in r){let f=r[d];this.setAttribute(d,f.clone(t))}let i=e.morphAttributes;for(let d in i){let f=[],p=i[d];for(let c=0,m=p.length;c<m;c++)f.push(p[c].clone(t));this.morphAttributes[d]=f}this.morphTargetsRelative=e.morphTargetsRelative;let s=e.groups;for(let d=0,f=s.length;d<f;d++){let p=s[d];this.addGroup(p.start,p.count,p.materialIndex)}let l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());let u=e.boundingSphere;return u!==null&&(this.boundingSphere=u.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};et.prototype.isBufferGeometry=!0;var Wb=new Fe,As=new qr,Lm=new Wr,Fr=new D,Br=new D,zr=new D,Cm=new D,Em=new D,Im=new D,tc=new D,nc=new D,ac=new D,rc=new le,ic=new le,sc=new le,Tm=new D,oc=new D,Le=class extends Xe{constructor(e=new et,t=new $r){super(),this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e){return super.copy(e),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry;if(e.isBufferGeometry){let t=e.morphAttributes,a=Object.keys(t);if(a.length>0){let r=t[a[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=r.length;i<s;i++){let l=r[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=i}}}}else{let t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}}raycast(e,t){let a=this.geometry,r=this.material,i=this.matrixWorld;if(r===void 0||(a.boundingSphere===null&&a.computeBoundingSphere(),Lm.copy(a.boundingSphere),Lm.applyMatrix4(i),e.ray.intersectsSphere(Lm)===!1)||(Wb.copy(i).invert(),As.copy(e.ray).applyMatrix4(Wb),a.boundingBox!==null&&As.intersectsBox(a.boundingBox)===!1))return;let s;if(a.isBufferGeometry){let l=a.index,u=a.attributes.position,d=a.morphAttributes.position,f=a.morphTargetsRelative,p=a.attributes.uv,c=a.attributes.uv2,m=a.groups,g=a.drawRange;if(l!==null)if(Array.isArray(r))for(let v=0,w=m.length;v<w;v++){let x=m[v],h=r[x.materialIndex],y=Math.max(x.start,g.start),_=Math.min(x.start+x.count,g.start+g.count);for(let b=y,M=_;b<M;b+=3){let S=l.getX(b),k=l.getX(b+1),E=l.getX(b+2);s=lc(this,h,e,As,u,d,f,p,c,S,k,E),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=x.materialIndex,t.push(s))}}else{let v=Math.max(0,g.start),w=Math.min(l.count,g.start+g.count);for(let x=v,h=w;x<h;x+=3){let y=l.getX(x),_=l.getX(x+1),b=l.getX(x+2);s=lc(this,r,e,As,u,d,f,p,c,y,_,b),s&&(s.faceIndex=Math.floor(x/3),t.push(s))}}else if(u!==void 0)if(Array.isArray(r))for(let v=0,w=m.length;v<w;v++){let x=m[v],h=r[x.materialIndex],y=Math.max(x.start,g.start),_=Math.min(x.start+x.count,g.start+g.count);for(let b=y,M=_;b<M;b+=3){let S=b,k=b+1,E=b+2;s=lc(this,h,e,As,u,d,f,p,c,S,k,E),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=x.materialIndex,t.push(s))}}else{let v=Math.max(0,g.start),w=Math.min(u.count,g.start+g.count);for(let x=v,h=w;x<h;x+=3){let y=x,_=x+1,b=x+2;s=lc(this,r,e,As,u,d,f,p,c,y,_,b),s&&(s.faceIndex=Math.floor(x/3),t.push(s))}}}else a.isGeometry&&console.error("THREE.Mesh.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}};Le.prototype.isMesh=!0;function LL(n,e,t,a,r,i,s,l){let u;if(e.side===Dt?u=a.intersectTriangle(s,i,r,!0,l):u=a.intersectTriangle(r,i,s,e.side!==of,l),u===null)return null;oc.copy(l),oc.applyMatrix4(n.matrixWorld);let d=t.ray.origin.distanceTo(oc);return d<t.near||d>t.far?null:{distance:d,point:oc.clone(),object:n}}function lc(n,e,t,a,r,i,s,l,u,d,f,p){Fr.fromBufferAttribute(r,d),Br.fromBufferAttribute(r,f),zr.fromBufferAttribute(r,p);let c=n.morphTargetInfluences;if(e.morphTargets&&i&&c){tc.set(0,0,0),nc.set(0,0,0),ac.set(0,0,0);for(let g=0,v=i.length;g<v;g++){let w=c[g],x=i[g];w!==0&&(Cm.fromBufferAttribute(x,d),Em.fromBufferAttribute(x,f),Im.fromBufferAttribute(x,p),s?(tc.addScaledVector(Cm,w),nc.addScaledVector(Em,w),ac.addScaledVector(Im,w)):(tc.addScaledVector(Cm.sub(Fr),w),nc.addScaledVector(Em.sub(Br),w),ac.addScaledVector(Im.sub(zr),w)))}Fr.add(tc),Br.add(nc),zr.add(ac)}n.isSkinnedMesh&&e.skinning&&(n.boneTransform(d,Fr),n.boneTransform(f,Br),n.boneTransform(p,zr));let m=LL(n,e,t,a,Fr,Br,zr,Tm);if(m){l&&(rc.fromBufferAttribute(l,d),ic.fromBufferAttribute(l,f),sc.fromBufferAttribute(l,p),m.uv=Qt.getUV(Tm,Fr,Br,zr,rc,ic,sc,new le)),u&&(rc.fromBufferAttribute(u,d),ic.fromBufferAttribute(u,f),sc.fromBufferAttribute(u,p),m.uv2=Qt.getUV(Tm,Fr,Br,zr,rc,ic,sc,new le));let g={a:d,b:f,c:p,normal:new D,materialIndex:0};Qt.getNormal(Fr,Br,zr,g.normal),m.face=g}return m}var Ge=class extends et{constructor(e=1,t=1,a=1,r=1,i=1,s=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:a,widthSegments:r,heightSegments:i,depthSegments:s};let l=this;r=Math.floor(r),i=Math.floor(i),s=Math.floor(s);let u=[],d=[],f=[],p=[],c=0,m=0;g("z","y","x",-1,-1,a,t,e,s,i,0),g("z","y","x",1,-1,a,t,-e,s,i,1),g("x","z","y",1,1,e,a,t,r,s,2),g("x","z","y",1,-1,e,a,-t,r,s,3),g("x","y","z",1,-1,e,t,a,r,i,4),g("x","y","z",-1,-1,e,t,-a,r,i,5),this.setIndex(u),this.setAttribute("position",new it(d,3)),this.setAttribute("normal",new it(f,3)),this.setAttribute("uv",new it(p,2));function g(v,w,x,h,y,_,b,M,S,k,E){let B=_/S,$=b/k,G=_/2,A=b/2,O=M/2,N=S+1,C=k+1,W=0,X=0,R=new D;for(let K=0;K<C;K++){let ne=K*$-A;for(let Y=0;Y<N;Y++){let J=Y*B-G;R[v]=J*h,R[w]=ne*y,R[x]=O,d.push(R.x,R.y,R.z),R[v]=0,R[w]=0,R[x]=M>0?1:-1,f.push(R.x,R.y,R.z),p.push(Y/S),p.push(1-K/k),W+=1}}for(let K=0;K<k;K++)for(let ne=0;ne<S;ne++){let Y=c+ne+N*K,J=c+ne+N*(K+1),z=c+(ne+1)+N*(K+1),q=c+(ne+1)+N*K;u.push(Y,J,q),u.push(J,z,q),X+=6}l.addGroup(m,X,E),m+=X,c+=W}}};function Xs(n){let e={};for(let t in n){e[t]={};for(let a in n[t]){let r=n[t][a];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?e[t][a]=r.clone():Array.isArray(r)?e[t][a]=r.slice():e[t][a]=r}}return e}function Jt(n){let e={};for(let t=0;t<n.length;t++){let a=Xs(n[t]);for(let r in a)e[r]=a[r]}return e}var CL={clone:Xs,merge:Jt},EL=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,IL=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,nr=class extends Bt{constructor(e){super(),this.type="ShaderMaterial",this.defines={},this.uniforms={},this.vertexShader=EL,this.fragmentShader=IL,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&(e.attributes!==void 0&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(e))}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Xs(e.uniforms),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.lights=e.lights,this.clipping=e.clipping,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let s=this.uniforms[r].value;s&&s.isTexture?t.uniforms[r]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[r]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[r]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[r]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[r]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[r]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[r]={type:"m4",value:s.toArray()}:t.uniforms[r]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader;let a={};for(let r in this.extensions)this.extensions[r]===!0&&(a[r]=!0);return Object.keys(a).length>0&&(t.extensions=a),t}};nr.prototype.isShaderMaterial=!0;var zl=class extends Xe{constructor(){super(),this.type="Camera",this.matrixWorldInverse=new Fe,this.projectionMatrix=new Fe,this.projectionMatrixInverse=new Fe}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this}getWorldDirection(e){e===void 0&&(console.warn("THREE.Camera: .getWorldDirection() target is now required"),e=new D),this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(-t[8],-t[9],-t[10]).normalize()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};zl.prototype.isCamera=!0;var Ft=class extends zl{constructor(e=50,t=1,a=.1,r=2e3){super(),this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=a,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Vm*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(im*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vm*2*Math.atan(Math.tan(im*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,a,r,i,s){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=a,this.view.offsetY=r,this.view.width=i,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(im*.5*this.fov)/this.zoom,a=2*t,r=this.aspect*a,i=-.5*r,s=this.view;if(this.view!==null&&this.view.enabled){let u=s.fullWidth,d=s.fullHeight;i+=s.offsetX*r/u,t-=s.offsetY*a/d,r*=s.width/u,a*=s.height/d}let l=this.filmOffset;l!==0&&(i+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-a,e,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};Ft.prototype.isPerspectiveCamera=!0;var ks=90,Ns=1,Ol=class extends Xe{constructor(e,t,a){if(super(),this.type="CubeCamera",a.isWebGLCubeRenderTarget!==!0){console.error("THREE.CubeCamera: The constructor now expects an instance of WebGLCubeRenderTarget as third parameter.");return}this.renderTarget=a;let r=new Ft(ks,Ns,e,t);r.layers=this.layers,r.up.set(0,-1,0),r.lookAt(new D(1,0,0)),this.add(r);let i=new Ft(ks,Ns,e,t);i.layers=this.layers,i.up.set(0,-1,0),i.lookAt(new D(-1,0,0)),this.add(i);let s=new Ft(ks,Ns,e,t);s.layers=this.layers,s.up.set(0,0,1),s.lookAt(new D(0,1,0)),this.add(s);let l=new Ft(ks,Ns,e,t);l.layers=this.layers,l.up.set(0,0,-1),l.lookAt(new D(0,-1,0)),this.add(l);let u=new Ft(ks,Ns,e,t);u.layers=this.layers,u.up.set(0,-1,0),u.lookAt(new D(0,0,1)),this.add(u);let d=new Ft(ks,Ns,e,t);d.layers=this.layers,d.up.set(0,-1,0),d.lookAt(new D(0,0,-1)),this.add(d)}update(e,t){this.parent===null&&this.updateMatrixWorld();let a=this.renderTarget,[r,i,s,l,u,d]=this.children,f=e.xr.enabled,p=e.getRenderTarget();e.xr.enabled=!1;let c=a.texture.generateMipmaps;a.texture.generateMipmaps=!1,e.setRenderTarget(a,0),e.render(t,r),e.setRenderTarget(a,1),e.render(t,i),e.setRenderTarget(a,2),e.render(t,s),e.setRenderTarget(a,3),e.render(t,l),e.setRenderTarget(a,4),e.render(t,u),a.texture.generateMipmaps=c,e.setRenderTarget(a,5),e.render(t,d),e.setRenderTarget(p),e.xr.enabled=f}},jr=class extends Kt{constructor(e,t,a,r,i,s,l,u,d,f){e=e!==void 0?e:[],t=t!==void 0?t:Jg,l=l!==void 0?l:Ai,super(e,t,a,r,i,s,l,u,d,f),this._needsFlipEnvMap=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};jr.prototype.isCubeTexture=!0;var Fc=class extends Ea{constructor(e,t,a){Number.isInteger(t)&&(console.warn("THREE.WebGLCubeRenderTarget: constructor signature is now WebGLCubeRenderTarget( size, options )"),t=a),super(e,e,t),t=t||{},this.texture=new jr(void 0,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.encoding),this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Wn,this.texture._needsFlipEnvMap=!1}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.format=qn,this.texture.encoding=t.encoding,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let a={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ge(5,5,5),i=new nr({name:"CubemapFromEquirect",uniforms:Xs(a.uniforms),vertexShader:a.vertexShader,fragmentShader:a.fragmentShader,side:Dt,blending:Ur});i.uniforms.tEquirect.value=t;let s=new Le(r,i),l=t.minFilter;return t.minFilter===e0&&(t.minFilter=Wn),new Ol(1,10,this).update(e,s),t.minFilter=l,s.geometry.dispose(),s.material.dispose(),this}clear(e,t,a,r){let i=e.getRenderTarget();for(let s=0;s<6;s++)e.setRenderTarget(this,s),e.clear(t,a,r);e.setRenderTarget(i)}};Fc.prototype.isWebGLCubeRenderTarget=!0;var Bc=class extends Kt{constructor(e,t,a,r,i,s,l,u,d,f,p,c){super(null,s,l,u,d,f,r,i,p,c),this.image={data:e||null,width:t||1,height:a||1},this.magFilter=d!==void 0?d:Rt,this.minFilter=f!==void 0?f:Rt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}};Bc.prototype.isDataTexture=!0;var Ps=new Wr,uc=new D,Ys=class{constructor(e=new Vn,t=new Vn,a=new Vn,r=new Vn,i=new Vn,s=new Vn){this.planes=[e,t,a,r,i,s]}set(e,t,a,r,i,s){let l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(a),l[3].copy(r),l[4].copy(i),l[5].copy(s),this}copy(e){let t=this.planes;for(let a=0;a<6;a++)t[a].copy(e.planes[a]);return this}setFromProjectionMatrix(e){let t=this.planes,a=e.elements,r=a[0],i=a[1],s=a[2],l=a[3],u=a[4],d=a[5],f=a[6],p=a[7],c=a[8],m=a[9],g=a[10],v=a[11],w=a[12],x=a[13],h=a[14],y=a[15];return t[0].setComponents(l-r,p-u,v-c,y-w).normalize(),t[1].setComponents(l+r,p+u,v+c,y+w).normalize(),t[2].setComponents(l+i,p+d,v+m,y+x).normalize(),t[3].setComponents(l-i,p-d,v-m,y-x).normalize(),t[4].setComponents(l-s,p-f,v-g,y-h).normalize(),t[5].setComponents(l+s,p+f,v+g,y+h).normalize(),this}intersectsObject(e){let t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Ps.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Ps)}intersectsSprite(e){return Ps.center.set(0,0,0),Ps.radius=.7071067811865476,Ps.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ps)}intersectsSphere(e){let t=this.planes,a=e.center,r=-e.radius;for(let i=0;i<6;i++)if(t[i].distanceToPoint(a)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let a=0;a<6;a++){let r=t[a];if(uc.x=r.normal.x>0?e.max.x:e.min.x,uc.y=r.normal.y>0?e.max.y:e.min.y,uc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(uc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let a=0;a<6;a++)if(t[a].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Y1(){let n=null,e=!1,t=null,a=null;function r(i,s){t(i,s),a=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(a=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(a),e=!1},setAnimationLoop:function(i){t=i},setContext:function(i){n=i}}}function TL(n,e){let t=e.isWebGL2,a=new WeakMap;function r(d,f){let p=d.array,c=d.usage,m=n.createBuffer();n.bindBuffer(f,m),n.bufferData(f,p,c),d.onUploadCallback();let g=5126;return p instanceof Float32Array?g=5126:p instanceof Float64Array?console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."):p instanceof Uint16Array?d.isFloat16BufferAttribute?t?g=5131:console.warn("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2."):g=5123:p instanceof Int16Array?g=5122:p instanceof Uint32Array?g=5125:p instanceof Int32Array?g=5124:p instanceof Int8Array?g=5120:p instanceof Uint8Array&&(g=5121),{buffer:m,type:g,bytesPerElement:p.BYTES_PER_ELEMENT,version:d.version}}function i(d,f,p){let c=f.array,m=f.updateRange;n.bindBuffer(p,d),m.count===-1?n.bufferSubData(p,0,c):(t?n.bufferSubData(p,m.offset*c.BYTES_PER_ELEMENT,c,m.offset,m.count):n.bufferSubData(p,m.offset*c.BYTES_PER_ELEMENT,c.subarray(m.offset,m.offset+m.count)),m.count=-1)}function s(d){return d.isInterleavedBufferAttribute&&(d=d.data),a.get(d)}function l(d){d.isInterleavedBufferAttribute&&(d=d.data);let f=a.get(d);f&&(n.deleteBuffer(f.buffer),a.delete(d))}function u(d,f){if(d.isGLBufferAttribute){let c=a.get(d);(!c||c.version<d.version)&&a.set(d,{buffer:d.buffer,type:d.type,bytesPerElement:d.elementSize,version:d.version});return}d.isInterleavedBufferAttribute&&(d=d.data);let p=a.get(d);p===void 0?a.set(d,r(d,f)):p.version<d.version&&(i(p.buffer,d,f),p.version=d.version)}return{get:s,remove:l,update:u}}var ki=class extends et{constructor(e=1,t=1,a=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:a,heightSegments:r};let i=e/2,s=t/2,l=Math.floor(a),u=Math.floor(r),d=l+1,f=u+1,p=e/l,c=t/u,m=[],g=[],v=[],w=[];for(let x=0;x<f;x++){let h=x*c-s;for(let y=0;y<d;y++){let _=y*p-i;g.push(_,-h,0),v.push(0,0,1),w.push(y/l),w.push(1-x/u)}}for(let x=0;x<u;x++)for(let h=0;h<l;h++){let y=h+d*x,_=h+d*(x+1),b=h+1+d*(x+1),M=h+1+d*x;m.push(y,_,M),m.push(_,b,M)}this.setIndex(m),this.setAttribute("position",new it(g,3)),this.setAttribute("normal",new it(v,3)),this.setAttribute("uv",new it(w,2))}},AL=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vUv ).g;
#endif`,kL=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,NL=`#ifdef ALPHATEST
	if ( diffuseColor.a < ALPHATEST ) discard;
#endif`,PL=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );
	#endif
#endif`,DL=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,FL="vec3 transformed = vec3( position );",BL=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zL=`vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	return vec2( -1.04, 1.04 ) * a004 + r.zw;
}
float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
#if defined ( PHYSICALLY_CORRECT_LIGHTS )
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
#else
	if( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
		return pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );
	}
	return 1.0;
#endif
}
vec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {
	float fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );
	return ( 1.0 - specularColor ) * fresnel + specularColor;
}
vec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {
	float fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );
	vec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;
	return Fr * fresnel + F0;
}
float G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	float gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	return 1.0 / ( gl * gv );
}
float G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
vec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( incidentLight.direction + viewDir );
	float dotNL = saturate( dot( normal, incidentLight.direction ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotLH = saturate( dot( incidentLight.direction, halfDir ) );
	vec3 F = F_Schlick( specularColor, dotLH );
	float G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( G * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
vec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 brdf = integrateSpecularBRDF( dotNV, roughness );
	return specularColor * brdf.x + brdf.y;
}
void BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
	float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
	vec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );
	vec2 brdf = integrateSpecularBRDF( dotNV, roughness );
	vec3 FssEss = F * brdf.x + brdf.y;
	float Ess = brdf.x + brdf.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );
	float dotNH = saturate( dot( geometry.normal, halfDir ) );
	float dotLH = saturate( dot( incidentLight.direction, halfDir ) );
	vec3 F = F_Schlick( specularColor, dotLH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
}
float GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {
	return ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );
}
float BlinnExponentToGGXRoughness( const in float blinnExponent ) {
	return sqrt( 2.0 / ( blinnExponent + 2.0 ) );
}
#if defined( USE_SHEEN )
float D_Charlie(float roughness, float NoH) {
	float invAlpha = 1.0 / roughness;
	float cos2h = NoH * NoH;
	float sin2h = max(1.0 - cos2h, 0.0078125);	return (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);
}
float V_Neubelt(float NoV, float NoL) {
	return saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));
}
vec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {
	vec3 N = geometry.normal;
	vec3 V = geometry.viewDir;
	vec3 H = normalize( V + L );
	float dotNH = saturate( dot( N, H ) );
	return specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );
}
#endif`,OL=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vUv );
		vec2 dSTdy = dFdy( vUv );
		float Hll = bumpScale * texture2D( bumpMap, vUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );
		vec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,HL=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,UL=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,RL=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,GL=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,VL=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,WL=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,qL=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,$L=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,jL=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate(a) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement(a) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract(sin(sn) * c);
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
vec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {
	float distance = dot( planeNormal, point - pointOnPlane );
	return - distance * planeNormal + point;
}
float sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {
	return sign( dot( point - pointOnPlane, planeNormal ) );
}
vec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {
	return lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float linearToRelativeLuminance( const in vec3 color ) {
	vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
	return dot( weights, color.rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}`,XL=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_maxMipLevel 8.0
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_maxTileSize 256.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		float texelSize = 1.0 / ( 3.0 * cubeUV_maxTileSize );
		vec2 uv = getUV( direction, face ) * ( faceSize - 1.0 );
		vec2 f = fract( uv );
		uv += 0.5 - f;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		if ( mipInt < cubeUV_maxMipLevel ) {
			uv.y += 2.0 * cubeUV_maxTileSize;
		}
		uv.y += filterInt * 2.0 * cubeUV_minTileSize;
		uv.x += 3.0 * max( 0.0, cubeUV_maxTileSize - 2.0 * faceSize );
		uv *= texelSize;
		vec3 tl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.x += texelSize;
		vec3 tr = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.y += texelSize;
		vec3 br = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		uv.x -= texelSize;
		vec3 bl = envMapTexelToLinear( texture2D( envMap, uv ) ).rgb;
		vec3 tm = mix( tl, tr, f.x );
		vec3 bm = mix( bl, br, f.x );
		return mix( tm, bm, f.y );
	}
	#define r0 1.0
	#define v0 0.339
	#define m0 - 2.0
	#define r1 0.8
	#define v1 0.276
	#define m1 - 1.0
	#define r4 0.4
	#define v4 0.046
	#define m4 2.0
	#define r5 0.305
	#define v5 0.016
	#define m5 3.0
	#define r6 0.21
	#define v6 0.0038
	#define m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= r1 ) {
			mip = ( r0 - roughness ) * ( m1 - m0 ) / ( r0 - r1 ) + m0;
		} else if ( roughness >= r4 ) {
			mip = ( r1 - roughness ) * ( m4 - m1 ) / ( r1 - r4 ) + m1;
		} else if ( roughness >= r5 ) {
			mip = ( r4 - roughness ) * ( m5 - m4 ) / ( r4 - r5 ) + m4;
		} else if ( roughness >= r6 ) {
			mip = ( r5 - roughness ) * ( m6 - m5 ) / ( r5 - r6 ) + m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), m0, cubeUV_maxMipLevel );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,YL=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ZL=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,JL=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );
#endif`,QL=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vUv );
	emissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,KL=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,eC="gl_FragColor = linearToOutputTexel( gl_FragColor );",tC=`
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 GammaToLinear( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );
}
vec4 LinearToGamma( in vec4 value, in float gammaFactor ) {
	return vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );
}
vec4 sRGBToLinear( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 RGBEToLinear( in vec4 value ) {
	return vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );
}
vec4 LinearToRGBE( in vec4 value ) {
	float maxComponent = max( max( value.r, value.g ), value.b );
	float fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );
	return vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );
}
vec4 RGBMToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * value.a * maxRange, 1.0 );
}
vec4 LinearToRGBM( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.r, max( value.g, value.b ) );
	float M = clamp( maxRGB / maxRange, 0.0, 1.0 );
	M = ceil( M * 255.0 ) / 255.0;
	return vec4( value.rgb / ( M * maxRange ), M );
}
vec4 RGBDToLinear( in vec4 value, in float maxRange ) {
	return vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );
}
vec4 LinearToRGBD( in vec4 value, in float maxRange ) {
	float maxRGB = max( value.r, max( value.g, value.b ) );
	float D = max( maxRange / maxRGB, 1.0 );
	D = clamp( floor( D ) / 255.0, 0.0, 1.0 );
	return vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );
}
const mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );
vec4 LinearToLogLuv( in vec4 value ) {
	vec3 Xp_Y_XYZp = cLogLuvM * value.rgb;
	Xp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );
	vec4 vResult;
	vResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;
	float Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;
	vResult.w = fract( Le );
	vResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;
	return vResult;
}
const mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );
vec4 LogLuvToLinear( in vec4 value ) {
	float Le = value.z * 255.0 + value.w;
	vec3 Xp_Y_XYZp;
	Xp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );
	Xp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;
	Xp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;
	vec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;
	return vec4( max( vRGB, 0.0 ), 1.0 );
}`,nC=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 envColor = textureCubeUV( envMap, reflectVec, 0.0 );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifndef ENVMAP_TYPE_CUBE_UV
		envColor = envMapTexelToLinear( envColor );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,aC=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform int maxMipLevel;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,rC=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,iC=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sC=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,oC=`#ifdef USE_FOG
	fogDepth = - mvPosition.z;
#endif`,lC=`#ifdef USE_FOG
	varying float fogDepth;
#endif`,uC=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, fogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,dC=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float fogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cC=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return texture2D( gradientMap, coord ).rgb;
	#else
		return ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );
	#endif
}`,fC=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel= texture2D( lightMap, vUv2 );
	reflectedLight.indirectDiffuse += PI * lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
#endif`,pC=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hC=`vec3 diffuse = vec3( 1.0 );
GeometricContext geometry;
geometry.position = mvPosition.xyz;
geometry.normal = normalize( transformedNormal );
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );
GeometricContext backGeometry;
backGeometry.position = geometry.position;
backGeometry.normal = -geometry.normal;
backGeometry.viewDir = geometry.viewDir;
vLightFront = vec3( 0.0 );
vIndirectFront = vec3( 0.0 );
#ifdef DOUBLE_SIDED
	vLightBack = vec3( 0.0 );
	vIndirectBack = vec3( 0.0 );
#endif
IncidentLight directLight;
float dotNL;
vec3 directLightColor_Diffuse;
vIndirectFront += getAmbientLightIrradiance( ambientLightColor );
vIndirectFront += getLightProbeIrradiance( lightProbe, geometry );
#ifdef DOUBLE_SIDED
	vIndirectBack += getAmbientLightIrradiance( ambientLightColor );
	vIndirectBack += getLightProbeIrradiance( lightProbe, backGeometry );
#endif
#if NUM_POINT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		getPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_SPOT_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		getSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_DIR_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		getDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );
		dotNL = dot( geometry.normal, directLight.direction );
		directLightColor_Diffuse = PI * directLight.color;
		vLightFront += saturate( dotNL ) * directLightColor_Diffuse;
		#ifdef DOUBLE_SIDED
			vLightBack += saturate( -dotNL ) * directLightColor_Diffuse;
		#endif
	}
	#pragma unroll_loop_end
#endif
#if NUM_HEMI_LIGHTS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
		vIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );
		#ifdef DOUBLE_SIDED
			vIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );
		#endif
	}
	#pragma unroll_loop_end
#endif`,mC=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {
	vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	return irradiance;
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		directLight.color = directionalLight.color;
		directLight.direction = directionalLight.direction;
		directLight.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		vec3 lVector = pointLight.position - geometry.position;
		directLight.direction = normalize( lVector );
		float lightDistance = length( lVector );
		directLight.color = pointLight.color;
		directLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );
		directLight.visible = ( directLight.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight ) {
		vec3 lVector = spotLight.position - geometry.position;
		directLight.direction = normalize( lVector );
		float lightDistance = length( lVector );
		float angleCos = dot( directLight.direction, spotLight.direction );
		if ( angleCos > spotLight.coneCos ) {
			float spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );
			directLight.color = spotLight.color;
			directLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );
			directLight.visible = true;
		} else {
			directLight.color = vec3( 0.0 );
			directLight.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {
		float dotNL = dot( geometry.normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			irradiance *= PI;
		#endif
		return irradiance;
	}
#endif`,gC=`#if defined( USE_ENVMAP )
	#ifdef ENVMAP_MODE_REFRACTION
		uniform float refractionRatio;
	#endif
	vec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {
		vec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );
		#ifdef ENVMAP_TYPE_CUBE
			vec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );
			#ifdef TEXTURE_LOD_EXT
				vec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );
			#else
				vec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );
			#endif
			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;
		#elif defined( ENVMAP_TYPE_CUBE_UV )
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
		#else
			vec4 envMapColor = vec4( 0.0 );
		#endif
		return PI * envMapColor.rgb * envMapIntensity;
	}
	float getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {
		float maxMIPLevelScalar = float( maxMIPLevel );
		float sigma = PI * roughness * roughness / ( 1.0 + roughness );
		float desiredMIPLevel = maxMIPLevelScalar + log2( sigma );
		return clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );
	}
	vec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( -viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
		#else
			vec3 reflectVec = refract( -viewDir, normal, refractionRatio );
		#endif
		reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
		float specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );
		#ifdef ENVMAP_TYPE_CUBE
			vec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );
			#ifdef TEXTURE_LOD_EXT
				vec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );
			#else
				vec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );
			#endif
			envMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;
		#elif defined( ENVMAP_TYPE_CUBE_UV )
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
		#endif
		return envMapColor.rgb * envMapIntensity;
	}
#endif`,xC=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vC=`varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
#define Material_LightProbeLOD( material )	(0)`,yC=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bC=`varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
#define Material_LightProbeLOD( material )	(0)`,wC=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.specularRoughness = max( roughnessFactor, 0.0525 );material.specularRoughness += geometryRoughness;
material.specularRoughness = min( material.specularRoughness, 1.0 );
#ifdef REFLECTIVITY
	material.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );
#endif
#ifdef CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheen;
#endif`,SC=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float specularRoughness;
	vec3 specularColor;
#ifdef CLEARCOAT
	float clearcoat;
	float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
	vec3 sheenColor;
#endif
};
#define MAXIMUM_SPECULAR_COEFFICIENT 0.16
#define DEFAULT_SPECULAR_COEFFICIENT 0.04
float clearcoatDHRApprox( const in float roughness, const in float dotNL ) {
	return DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.specularRoughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifndef PHYSICALLY_CORRECT_LIGHTS
		irradiance *= PI;
	#endif
	#ifdef CLEARCOAT
		float ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = ccDotNL * directLight.color;
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			ccIrradiance *= PI;
		#endif
		float clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );
		reflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );
	#else
		float clearcoatDHR = 0.0;
	#endif
	#ifdef USE_SHEEN
		reflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(
			material.specularRoughness,
			directLight.direction,
			geometry,
			material.sheenColor
		);
	#else
		reflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);
	#endif
	reflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef CLEARCOAT
		float ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		reflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );
		float ccDotNL = ccDotNV;
		float clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );
	#else
		float clearcoatDHR = 0.0;
	#endif
	float clearcoatInv = 1.0 - clearcoatDHR;
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	BRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );
	vec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );
	reflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,MC=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointDirectLightIrradiance( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotDirectLightIrradiance( spotLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= all( bvec2( directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,_C=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel= texture2D( lightMap, vUv2 );
		vec3 lightMapIrradiance = lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
		#ifndef PHYSICALLY_CORRECT_LIGHTS
			lightMapIrradiance *= PI;
		#endif
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );
	#ifdef CLEARCOAT
		clearcoatRadiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );
	#endif
#endif`,LC=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,CC=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,EC=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,IC=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,TC=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,AC=`#ifdef USE_MAP
	vec4 texelColor = texture2D( map, vUv );
	texelColor = mapTexelToLinear( texelColor );
	diffuseColor *= texelColor;
#endif`,kC=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,NC=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
#endif
#ifdef USE_MAP
	vec4 mapTexel = texture2D( map, uv );
	diffuseColor *= mapTexelToLinear( mapTexel );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,PC=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	uniform mat3 uvTransform;
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,DC=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vUv );
	metalnessFactor *= texelMetalness.b;
#endif`,FC=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,BC=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
	objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
	objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
	objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
#endif`,zC=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifndef USE_MORPHNORMALS
		uniform float morphTargetInfluences[ 8 ];
	#else
		uniform float morphTargetInfluences[ 4 ];
	#endif
#endif`,OC=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	transformed += morphTarget0 * morphTargetInfluences[ 0 ];
	transformed += morphTarget1 * morphTargetInfluences[ 1 ];
	transformed += morphTarget2 * morphTargetInfluences[ 2 ];
	transformed += morphTarget3 * morphTargetInfluences[ 3 ];
	#ifndef USE_MORPHNORMALS
		transformed += morphTarget4 * morphTargetInfluences[ 4 ];
		transformed += morphTarget5 * morphTargetInfluences[ 5 ];
		transformed += morphTarget6 * morphTargetInfluences[ 6 ];
		transformed += morphTarget7 * morphTargetInfluences[ 7 ];
	#endif
#endif`,HC=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );
	vec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	#ifdef USE_TANGENT
		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );
		#ifdef DOUBLE_SIDED
			tangent = tangent * faceDirection;
			bitangent = bitangent * faceDirection;
		#endif
		#if defined( TANGENTSPACE_NORMALMAP ) || defined( USE_CLEARCOAT_NORMALMAP )
			mat3 vTBN = mat3( tangent, bitangent, normal );
		#endif
	#endif
#endif
vec3 geometryNormal = normal;`,UC=`#ifdef OBJECTSPACE_NORMALMAP
	normal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( TANGENTSPACE_NORMALMAP )
	vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	#ifdef USE_TANGENT
		normal = normalize( vTBN * mapN );
	#else
		normal = perturbNormal2Arb( -vViewPosition, normal, mapN, faceDirection );
	#endif
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,RC=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef OBJECTSPACE_NORMALMAP
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec3 mapN, float faceDirection ) {
		vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
		vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
		vec2 st0 = dFdx( vUv.st );
		vec2 st1 = dFdy( vUv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : faceDirection * inversesqrt( det );
		return normalize( T * ( mapN.x * scale ) + B * ( mapN.y * scale ) + N * mapN.z );
	}
#endif`,GC=`#ifdef CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,VC=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	#ifdef USE_TANGENT
		clearcoatNormal = normalize( vTBN * clearcoatMapN );
	#else
		clearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatMapN, faceDirection );
	#endif
#endif`,WC=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif`,qC=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ));
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w);
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {
	return linearClipZ * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return (( near + viewZ ) * far ) / (( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * invClipZ - far );
}`,$C=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jC=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,XC=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,YC=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ZC=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vUv );
	roughnessFactor *= texelRoughness.g;
#endif`,JC=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,QC=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );
		bool inFrustum = all( inFrustumVec );
		bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );
		bool frustumTest = all( frustumTestVec );
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ), 
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ), 
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,KC=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];
		varying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,eE=`#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SPOT_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		vec4 shadowWorldPosition;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
		vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias, 0 );
		vSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
		vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
	#endif
#endif`,tE=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,nE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,aE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	#ifdef BONE_TEXTURE
		uniform highp sampler2D boneTexture;
		uniform int boneTextureSize;
		mat4 getBoneMatrix( const in float i ) {
			float j = i * 4.0;
			float x = mod( j, float( boneTextureSize ) );
			float y = floor( j / float( boneTextureSize ) );
			float dx = 1.0 / float( boneTextureSize );
			float dy = 1.0 / float( boneTextureSize );
			y = dy * ( y + 0.5 );
			vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
			vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
			vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
			vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
			mat4 bone = mat4( v1, v2, v3, v4 );
			return bone;
		}
	#else
		uniform mat4 boneMatrices[ MAX_BONES ];
		mat4 getBoneMatrix( const in float i ) {
			mat4 bone = boneMatrices[ int(i) ];
			return bone;
		}
	#endif
#endif`,rE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,iE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,sE=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,oE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,lE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,uE=`#ifndef saturate
#define saturate(a) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,dE=`#ifdef USE_TRANSMISSIONMAP
	totalTransmission *= texture2D( transmissionMap, vUv ).r;
#endif`,cE=`#ifdef USE_TRANSMISSIONMAP
	uniform sampler2D transmissionMap;
#endif`,fE=`#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )
	varying vec2 vUv;
#endif`,pE=`#ifdef USE_UV
	#ifdef UVS_VERTEX_ONLY
		vec2 vUv;
	#else
		varying vec2 vUv;
	#endif
	uniform mat3 uvTransform;
#endif`,hE=`#ifdef USE_UV
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif`,mE=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	varying vec2 vUv2;
#endif`,gE=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	attribute vec2 uv2;
	varying vec2 vUv2;
	uniform mat3 uv2Transform;
#endif`,xE=`#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )
	vUv2 = ( uv2Transform * vec3( uv2, 1 ) ).xy;
#endif`,vE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,yE=`uniform sampler2D t2D;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	gl_FragColor = mapTexelToLinear( texColor );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,bE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wE=`#include <envmap_common_pars_fragment>
uniform float opacity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	vec3 vReflect = vWorldDirection;
	#include <envmap_fragment>
	gl_FragColor = envColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,SE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ME=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,_E=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,LE=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,CE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,EE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	vec4 texColor = texture2D( tEquirect, sampleUV );
	gl_FragColor = mapTexelToLinear( texColor );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,IE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,TE=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,AE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kE=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
	
		vec4 lightMapTexel= texture2D( lightMap, vUv2 );
		reflectedLight.indirectDiffuse += lightMapTexelToLinear( lightMapTexel ).rgb * lightMapIntensity;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,NE=`#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <skinbase_vertex>
	#ifdef USE_ENVMAP
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,PE=`uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <fog_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <emissivemap_fragment>
	#ifdef DOUBLE_SIDED
		reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;
	#else
		reflectedLight.indirectDiffuse += vIndirectFront;
	#endif
	#include <lightmap_fragment>
	reflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );
	#ifdef DOUBLE_SIDED
		reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;
	#else
		reflectedLight.directDiffuse = vLightFront;
	#endif
	reflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,DE=`#define LAMBERT
varying vec3 vLightFront;
varying vec3 vIndirectFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
	varying vec3 vIndirectBack;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <bsdfs>
#include <lights_pars_begin>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <lights_lambert_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,FE=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <fog_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
		matcapColor = matcapTexelToLinear( matcapColor );
	#else
		vec4 matcapColor = vec4( 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,BE=`#define MATCAP
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#ifndef FLAT_SHADED
		vNormal = normalize( transformedNormal );
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,zE=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,OE=`#define TOON
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,HE=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,UE=`#define PHONG
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,RE=`#define STANDARD
#ifdef PHYSICAL
	#define REFLECTIVITY
	#define CLEARCOAT
	#define TRANSMISSION
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef TRANSMISSION
	uniform float transmission;
#endif
#ifdef REFLECTIVITY
	uniform float reflectivity;
#endif
#ifdef CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheen;
#endif
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <transmissionmap_pars_fragment>
#include <bsdfs>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#ifdef TRANSMISSION
		float totalTransmission = transmission;
	#endif
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <transmissionmap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#ifdef TRANSMISSION
		diffuseColor.a *= mix( saturate( 1. - totalTransmission + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) ), 1.0, metalness );
	#endif
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,GE=`#define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <uv2_vertex>
	#include <color_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,VE=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <packing>
#include <uv_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
}`,WE=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	varying vec3 vViewPosition;
#endif
#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )
	vViewPosition = - mvPosition.xyz;
#endif
}`,qE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$E=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <color_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,jE=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,XE=`#include <common>
#include <fog_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <begin_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,YE=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	gl_FragColor = vec4( outgoingLight, diffuseColor.a );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,ZE=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,We={alphamap_fragment:AL,alphamap_pars_fragment:kL,alphatest_fragment:NL,aomap_fragment:PL,aomap_pars_fragment:DL,begin_vertex:FL,beginnormal_vertex:BL,bsdfs:zL,bumpmap_pars_fragment:OL,clipping_planes_fragment:HL,clipping_planes_pars_fragment:UL,clipping_planes_pars_vertex:RL,clipping_planes_vertex:GL,color_fragment:VL,color_pars_fragment:WL,color_pars_vertex:qL,color_vertex:$L,common:jL,cube_uv_reflection_fragment:XL,defaultnormal_vertex:YL,displacementmap_pars_vertex:ZL,displacementmap_vertex:JL,emissivemap_fragment:QL,emissivemap_pars_fragment:KL,encodings_fragment:eC,encodings_pars_fragment:tC,envmap_fragment:nC,envmap_common_pars_fragment:aC,envmap_pars_fragment:rC,envmap_pars_vertex:iC,envmap_physical_pars_fragment:gC,envmap_vertex:sC,fog_vertex:oC,fog_pars_vertex:lC,fog_fragment:uC,fog_pars_fragment:dC,gradientmap_pars_fragment:cC,lightmap_fragment:fC,lightmap_pars_fragment:pC,lights_lambert_vertex:hC,lights_pars_begin:mC,lights_toon_fragment:xC,lights_toon_pars_fragment:vC,lights_phong_fragment:yC,lights_phong_pars_fragment:bC,lights_physical_fragment:wC,lights_physical_pars_fragment:SC,lights_fragment_begin:MC,lights_fragment_maps:_C,lights_fragment_end:LC,logdepthbuf_fragment:CC,logdepthbuf_pars_fragment:EC,logdepthbuf_pars_vertex:IC,logdepthbuf_vertex:TC,map_fragment:AC,map_pars_fragment:kC,map_particle_fragment:NC,map_particle_pars_fragment:PC,metalnessmap_fragment:DC,metalnessmap_pars_fragment:FC,morphnormal_vertex:BC,morphtarget_pars_vertex:zC,morphtarget_vertex:OC,normal_fragment_begin:HC,normal_fragment_maps:UC,normalmap_pars_fragment:RC,clearcoat_normal_fragment_begin:GC,clearcoat_normal_fragment_maps:VC,clearcoat_pars_fragment:WC,packing:qC,premultiplied_alpha_fragment:$C,project_vertex:jC,dithering_fragment:XC,dithering_pars_fragment:YC,roughnessmap_fragment:ZC,roughnessmap_pars_fragment:JC,shadowmap_pars_fragment:QC,shadowmap_pars_vertex:KC,shadowmap_vertex:eE,shadowmask_pars_fragment:tE,skinbase_vertex:nE,skinning_pars_vertex:aE,skinning_vertex:rE,skinnormal_vertex:iE,specularmap_fragment:sE,specularmap_pars_fragment:oE,tonemapping_fragment:lE,tonemapping_pars_fragment:uE,transmissionmap_fragment:dE,transmissionmap_pars_fragment:cE,uv_pars_fragment:fE,uv_pars_vertex:pE,uv_vertex:hE,uv2_pars_fragment:mE,uv2_pars_vertex:gE,uv2_vertex:xE,worldpos_vertex:vE,background_frag:yE,background_vert:bE,cube_frag:wE,cube_vert:SE,depth_frag:ME,depth_vert:_E,distanceRGBA_frag:LE,distanceRGBA_vert:CE,equirect_frag:EE,equirect_vert:IE,linedashed_frag:TE,linedashed_vert:AE,meshbasic_frag:kE,meshbasic_vert:NE,meshlambert_frag:PE,meshlambert_vert:DE,meshmatcap_frag:FE,meshmatcap_vert:BE,meshtoon_frag:zE,meshtoon_vert:OE,meshphong_frag:HE,meshphong_vert:UE,meshphysical_frag:RE,meshphysical_vert:GE,normal_frag:VE,normal_vert:WE,points_frag:qE,points_vert:$E,shadow_frag:jE,shadow_vert:XE,sprite_frag:YE,sprite_vert:ZE},be={common:{diffuse:{value:new Ce(15658734)},opacity:{value:1},map:{value:null},uvTransform:{value:new At},uv2Transform:{value:new At},alphaMap:{value:null}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},refractionRatio:{value:.98},maxMipLevel:{value:0}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new le(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ce(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ce(15658734)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},uvTransform:{value:new At}},sprite:{diffuse:{value:new Ce(15658734)},opacity:{value:1},center:{value:new le(.5,.5)},rotation:{value:0},map:{value:null},alphaMap:{value:null},uvTransform:{value:new At}}},La={basic:{uniforms:Jt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Jt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.fog,be.lights,{emissive:{value:new Ce(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Jt([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new Ce(0)},specular:{value:new Ce(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Jt([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new Ce(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Jt([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new Ce(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Jt([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Jt([be.points,be.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Jt([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Jt([be.common,be.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Jt([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:We.normal_vert,fragmentShader:We.normal_frag},sprite:{uniforms:Jt([be.sprite,be.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new At},t2D:{value:null}},vertexShader:We.background_vert,fragmentShader:We.background_frag},cube:{uniforms:Jt([be.envmap,{opacity:{value:1}}]),vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:Jt([be.common,be.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:Jt([be.lights,be.fog,{color:{value:new Ce(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};La.physical={uniforms:Jt([La.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatNormalScale:{value:new le(1,1)},clearcoatNormalMap:{value:null},sheen:{value:new Ce(0)},transmission:{value:0},transmissionMap:{value:null}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};function JE(n,e,t,a,r){let i=new Ce(0),s=0,l,u,d=null,f=0,p=null;function c(g,v,w,x){let h=v.isScene===!0?v.background:null;h&&h.isTexture&&(h=e.get(h));let y=n.xr,_=y.getSession&&y.getSession();_&&_.environmentBlendMode==="additive"&&(h=null),h===null?m(i,s):h&&h.isColor&&(m(h,1),x=!0),(n.autoClear||x)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),h&&(h.isCubeTexture||h.mapping===df)?(u===void 0&&(u=new Le(new Ge(1,1,1),new nr({name:"BackgroundCubeMaterial",uniforms:Xs(La.cube.uniforms),vertexShader:La.cube.vertexShader,fragmentShader:La.cube.fragmentShader,side:Dt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(b,M,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),a.update(u)),u.material.uniforms.envMap.value=h,u.material.uniforms.flipEnvMap.value=h.isCubeTexture&&h._needsFlipEnvMap?-1:1,(d!==h||f!==h.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,d=h,f=h.version,p=n.toneMapping),g.unshift(u,u.geometry,u.material,0,0,null)):h&&h.isTexture&&(l===void 0&&(l=new Le(new ki(2,2),new nr({name:"BackgroundMaterial",uniforms:Xs(La.background.uniforms),vertexShader:La.background.vertexShader,fragmentShader:La.background.fragmentShader,side:sf,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),a.update(l)),l.material.uniforms.t2D.value=h,h.matrixAutoUpdate===!0&&h.updateMatrix(),l.material.uniforms.uvTransform.value.copy(h.matrix),(d!==h||f!==h.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,d=h,f=h.version,p=n.toneMapping),g.unshift(l,l.geometry,l.material,0,0,null))}function m(g,v){t.buffers.color.setClear(g.r,g.g,g.b,v,r)}return{getClearColor:function(){return i},setClearColor:function(g,v=1){i.set(g),s=v,m(i,s)},getClearAlpha:function(){return s},setClearAlpha:function(g){s=g,m(i,s)},render:c}}function QE(n,e,t,a){let r=n.getParameter(34921),i=a.isWebGL2?null:e.get("OES_vertex_array_object"),s=a.isWebGL2||i!==null,l={},u=v(null),d=u;function f(A,O,N,C,W){let X=!1;if(s){let R=g(C,N,O);d!==R&&(d=R,c(d.object)),X=w(C,W),X&&x(C,W)}else{let R=O.wireframe===!0;(d.geometry!==C.id||d.program!==N.id||d.wireframe!==R)&&(d.geometry=C.id,d.program=N.id,d.wireframe=R,X=!0)}A.isInstancedMesh===!0&&(X=!0),W!==null&&t.update(W,34963),X&&(S(A,O,N,C),W!==null&&n.bindBuffer(34963,t.get(W).buffer))}function p(){return a.isWebGL2?n.createVertexArray():i.createVertexArrayOES()}function c(A){return a.isWebGL2?n.bindVertexArray(A):i.bindVertexArrayOES(A)}function m(A){return a.isWebGL2?n.deleteVertexArray(A):i.deleteVertexArrayOES(A)}function g(A,O,N){let C=N.wireframe===!0,W=l[A.id];W===void 0&&(W={},l[A.id]=W);let X=W[O.id];X===void 0&&(X={},W[O.id]=X);let R=X[C];return R===void 0&&(R=v(p()),X[C]=R),R}function v(A){let O=[],N=[],C=[];for(let W=0;W<r;W++)O[W]=0,N[W]=0,C[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:N,attributeDivisors:C,object:A,attributes:{},index:null}}function w(A,O){let N=d.attributes,C=A.attributes,W=0;for(let X in C){let R=N[X],K=C[X];if(R===void 0||R.attribute!==K||R.data!==K.data)return!0;W++}return d.attributesNum!==W||d.index!==O}function x(A,O){let N={},C=A.attributes,W=0;for(let X in C){let R=C[X],K={};K.attribute=R,R.data&&(K.data=R.data),N[X]=K,W++}d.attributes=N,d.attributesNum=W,d.index=O}function h(){let A=d.newAttributes;for(let O=0,N=A.length;O<N;O++)A[O]=0}function y(A){_(A,0)}function _(A,O){let N=d.newAttributes,C=d.enabledAttributes,W=d.attributeDivisors;N[A]=1,C[A]===0&&(n.enableVertexAttribArray(A),C[A]=1),W[A]!==O&&((a.isWebGL2?n:e.get("ANGLE_instanced_arrays"))[a.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](A,O),W[A]=O)}function b(){let A=d.newAttributes,O=d.enabledAttributes;for(let N=0,C=O.length;N<C;N++)O[N]!==A[N]&&(n.disableVertexAttribArray(N),O[N]=0)}function M(A,O,N,C,W,X){a.isWebGL2===!0&&(N===5124||N===5125)?n.vertexAttribIPointer(A,O,N,W,X):n.vertexAttribPointer(A,O,N,C,W,X)}function S(A,O,N,C){if(a.isWebGL2===!1&&(A.isInstancedMesh||C.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;h();let W=C.attributes,X=N.getAttributes(),R=O.defaultAttributeValues;for(let K in X){let ne=X[K];if(ne>=0){let Y=W[K];if(Y!==void 0){let J=Y.normalized,z=Y.itemSize,q=t.get(Y);if(q===void 0)continue;let de=q.buffer,ge=q.type,ye=q.bytesPerElement;if(Y.isInterleavedBufferAttribute){let Ne=Y.data,ce=Ne.stride,ze=Y.offset;Ne&&Ne.isInstancedInterleavedBuffer?(_(ne,Ne.meshPerAttribute),C._maxInstanceCount===void 0&&(C._maxInstanceCount=Ne.meshPerAttribute*Ne.count)):y(ne),n.bindBuffer(34962,de),M(ne,z,ge,J,ce*ye,ze*ye)}else Y.isInstancedBufferAttribute?(_(ne,Y.meshPerAttribute),C._maxInstanceCount===void 0&&(C._maxInstanceCount=Y.meshPerAttribute*Y.count)):y(ne),n.bindBuffer(34962,de),M(ne,z,ge,J,0,0)}else if(K==="instanceMatrix"){let J=t.get(A.instanceMatrix);if(J===void 0)continue;let z=J.buffer,q=J.type;_(ne+0,1),_(ne+1,1),_(ne+2,1),_(ne+3,1),n.bindBuffer(34962,z),n.vertexAttribPointer(ne+0,4,q,!1,64,0),n.vertexAttribPointer(ne+1,4,q,!1,64,16),n.vertexAttribPointer(ne+2,4,q,!1,64,32),n.vertexAttribPointer(ne+3,4,q,!1,64,48)}else if(K==="instanceColor"){let J=t.get(A.instanceColor);if(J===void 0)continue;let z=J.buffer,q=J.type;_(ne,1),n.bindBuffer(34962,z),n.vertexAttribPointer(ne,3,q,!1,12,0)}else if(R!==void 0){let J=R[K];if(J!==void 0)switch(J.length){case 2:n.vertexAttrib2fv(ne,J);break;case 3:n.vertexAttrib3fv(ne,J);break;case 4:n.vertexAttrib4fv(ne,J);break;default:n.vertexAttrib1fv(ne,J)}}}}b()}function k(){$();for(let A in l){let O=l[A];for(let N in O){let C=O[N];for(let W in C)m(C[W].object),delete C[W];delete O[N]}delete l[A]}}function E(A){if(l[A.id]===void 0)return;let O=l[A.id];for(let N in O){let C=O[N];for(let W in C)m(C[W].object),delete C[W];delete O[N]}delete l[A.id]}function B(A){for(let O in l){let N=l[O];if(N[A.id]===void 0)continue;let C=N[A.id];for(let W in C)m(C[W].object),delete C[W];delete N[A.id]}}function $(){G(),d!==u&&(d=u,c(d.object))}function G(){u.geometry=null,u.program=null,u.wireframe=!1}return{setup:f,reset:$,resetDefaultState:G,dispose:k,releaseStatesOfGeometry:E,releaseStatesOfProgram:B,initAttributes:h,enableAttribute:y,disableUnusedAttributes:b}}function KE(n,e,t,a){let r=a.isWebGL2,i;function s(d){i=d}function l(d,f){n.drawArrays(i,d,f),t.update(f,i,1)}function u(d,f,p){if(p===0)return;let c,m;if(r)c=n,m="drawArraysInstanced";else if(c=e.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",c===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}c[m](i,d,f,p),t.update(f,i,p)}this.setMode=s,this.render=l,this.renderInstances=u}function eI(n,e,t){let a;function r(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){let M=e.get("EXT_texture_filter_anisotropic");a=n.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function i(M){if(M==="highp"){if(n.getShaderPrecisionFormat(35633,36338).precision>0&&n.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";M="mediump"}return M==="mediump"&&n.getShaderPrecisionFormat(35633,36337).precision>0&&n.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}let s=typeof WebGL2RenderingContext<"u"&&n instanceof WebGL2RenderingContext||typeof WebGL2ComputeRenderingContext<"u"&&n instanceof WebGL2ComputeRenderingContext,l=t.precision!==void 0?t.precision:"highp",u=i(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=t.logarithmicDepthBuffer===!0,f=n.getParameter(34930),p=n.getParameter(35660),c=n.getParameter(3379),m=n.getParameter(34076),g=n.getParameter(34921),v=n.getParameter(36347),w=n.getParameter(36348),x=n.getParameter(36349),h=p>0,y=s||e.has("OES_texture_float"),_=h&&y,b=s?n.getParameter(36183):0;return{isWebGL2:s,getMaxAnisotropy:r,getMaxPrecision:i,precision:l,logarithmicDepthBuffer:d,maxTextures:f,maxVertexTextures:p,maxTextureSize:c,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:v,maxVaryings:w,maxFragmentUniforms:x,vertexTextures:h,floatFragmentTextures:y,floatVertexTextures:_,maxSamples:b}}function tI(n){let e=this,t=null,a=0,r=!1,i=!1,s=new Vn,l=new At,u={value:null,needsUpdate:!1};this.uniform=u,this.numPlanes=0,this.numIntersection=0,this.init=function(p,c,m){let g=p.length!==0||c||a!==0||r;return r=c,t=f(p,m,0),a=p.length,g},this.beginShadows=function(){i=!0,f(null)},this.endShadows=function(){i=!1,d()},this.setState=function(p,c,m){let g=p.clippingPlanes,v=p.clipIntersection,w=p.clipShadows,x=n.get(p);if(!r||g===null||g.length===0||i&&!w)i?f(null):d();else{let h=i?0:a,y=h*4,_=x.clippingState||null;u.value=_,_=f(g,c,y,m);for(let b=0;b!==y;++b)_[b]=t[b];x.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=h}};function d(){u.value!==t&&(u.value=t,u.needsUpdate=a>0),e.numPlanes=a,e.numIntersection=0}function f(p,c,m,g){let v=p!==null?p.length:0,w=null;if(v!==0){if(w=u.value,g!==!0||w===null){let x=m+v*4,h=c.matrixWorldInverse;l.getNormalMatrix(h),(w===null||w.length<x)&&(w=new Float32Array(x));for(let y=0,_=m;y!==v;++y,_+=4)s.copy(p[y]).applyMatrix4(h,l),s.normal.toArray(w,_),w[_+3]=s.constant}u.value=w,u.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,w}}function nI(n){let e=new WeakMap;function t(s,l){return l===vb?s.mapping=Jg:l===yb&&(s.mapping=Qg),s}function a(s){if(s&&s.isTexture){let l=s.mapping;if(l===vb||l===yb)if(e.has(s)){let u=e.get(s).texture;return t(u,s.mapping)}else{let u=s.image;if(u&&u.height>0){let d=n.getRenderTarget(),f=new Fc(u.height/2);return f.fromEquirectangularTexture(n,s),e.set(s,f),n.setRenderTarget(d),s.addEventListener("dispose",r),t(f.texture,s.mapping)}else return null}}return s}function r(s){let l=s.target;l.removeEventListener("dispose",r);let u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function i(){e=new WeakMap}return{get:a,dispose:i}}function aI(n){let e={};function t(a){if(e[a]!==void 0)return e[a];let r;switch(a){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(a)}return e[a]=r,r}return{has:function(a){return t(a)!==null},init:function(a){a.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float")},get:function(a){let r=t(a);return r===null&&console.warn("THREE.WebGLRenderer: "+a+" extension not supported."),r}}}function rI(n,e,t,a){let r={},i=new WeakMap;function s(p){let c=p.target;c.index!==null&&e.remove(c.index);for(let g in c.attributes)e.remove(c.attributes[g]);c.removeEventListener("dispose",s),delete r[c.id];let m=i.get(c);m&&(e.remove(m),i.delete(c)),a.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function l(p,c){return r[c.id]===!0||(c.addEventListener("dispose",s),r[c.id]=!0,t.memory.geometries++),c}function u(p){let c=p.attributes;for(let g in c)e.update(c[g],34962);let m=p.morphAttributes;for(let g in m){let v=m[g];for(let w=0,x=v.length;w<x;w++)e.update(v[w],34962)}}function d(p){let c=[],m=p.index,g=p.attributes.position,v=0;if(m!==null){let h=m.array;v=m.version;for(let y=0,_=h.length;y<_;y+=3){let b=h[y+0],M=h[y+1],S=h[y+2];c.push(b,M,M,S,S,b)}}else{let h=g.array;v=g.version;for(let y=0,_=h.length/3-1;y<_;y+=3){let b=y+0,M=y+1,S=y+2;c.push(b,M,M,S,S,b)}}let w=new(X1(c)>65535?Dc:Pc)(c,1);w.version=v;let x=i.get(p);x&&e.remove(x),i.set(p,w)}function f(p){let c=i.get(p);if(c){let m=p.index;m!==null&&c.version<m.version&&d(p)}else d(p);return i.get(p)}return{get:l,update:u,getWireframeAttribute:f}}function iI(n,e,t,a){let r=a.isWebGL2,i;function s(c){i=c}let l,u;function d(c){l=c.type,u=c.bytesPerElement}function f(c,m){n.drawElements(i,m,l,c*u),t.update(m,i,1)}function p(c,m,g){if(g===0)return;let v,w;if(r)v=n,w="drawElementsInstanced";else if(v=e.get("ANGLE_instanced_arrays"),w="drawElementsInstancedANGLE",v===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}v[w](i,m,l,c*u,g),t.update(m,i,g)}this.setMode=s,this.setIndex=d,this.render=f,this.renderInstances=p}function sI(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function a(i,s,l){switch(t.calls++,s){case 4:t.triangles+=l*(i/3);break;case 1:t.lines+=l*(i/2);break;case 3:t.lines+=l*(i-1);break;case 2:t.lines+=l*i;break;case 0:t.points+=l*i;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",s);break}}function r(){t.frame++,t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:a}}function oI(n,e){return n[0]-e[0]}function lI(n,e){return Math.abs(e[1])-Math.abs(n[1])}function uI(n){let e={},t=new Float32Array(8),a=[];for(let i=0;i<8;i++)a[i]=[i,0];function r(i,s,l,u){let d=i.morphTargetInfluences,f=d===void 0?0:d.length,p=e[s.id];if(p===void 0){p=[];for(let w=0;w<f;w++)p[w]=[w,0];e[s.id]=p}for(let w=0;w<f;w++){let x=p[w];x[0]=w,x[1]=d[w]}p.sort(lI);for(let w=0;w<8;w++)w<f&&p[w][1]?(a[w][0]=p[w][0],a[w][1]=p[w][1]):(a[w][0]=Number.MAX_SAFE_INTEGER,a[w][1]=0);a.sort(oI);let c=l.morphTargets&&s.morphAttributes.position,m=l.morphNormals&&s.morphAttributes.normal,g=0;for(let w=0;w<8;w++){let x=a[w],h=x[0],y=x[1];h!==Number.MAX_SAFE_INTEGER&&y?(c&&s.getAttribute("morphTarget"+w)!==c[h]&&s.setAttribute("morphTarget"+w,c[h]),m&&s.getAttribute("morphNormal"+w)!==m[h]&&s.setAttribute("morphNormal"+w,m[h]),t[w]=y,g+=y):(c&&s.hasAttribute("morphTarget"+w)===!0&&s.deleteAttribute("morphTarget"+w),m&&s.hasAttribute("morphNormal"+w)===!0&&s.deleteAttribute("morphNormal"+w),t[w]=0)}let v=s.morphTargetsRelative?1:1-g;u.getUniforms().setValue(n,"morphTargetBaseInfluence",v),u.getUniforms().setValue(n,"morphTargetInfluences",t)}return{update:r}}function dI(n,e,t,a){let r=new WeakMap;function i(u){let d=a.render.frame,f=u.geometry,p=e.get(u,f);return r.get(p)!==d&&(e.update(p),r.set(p,d)),u.isInstancedMesh&&(u.hasEventListener("dispose",l)===!1&&u.addEventListener("dispose",l),t.update(u.instanceMatrix,34962),u.instanceColor!==null&&t.update(u.instanceColor,34962)),p}function s(){r=new WeakMap}function l(u){let d=u.target;d.removeEventListener("dispose",l),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:i,dispose:s}}var zc=class extends Kt{constructor(e=null,t=1,a=1,r=1){super(null),this.image={data:e,width:t,height:a,depth:r},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=da,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}};zc.prototype.isDataTexture2DArray=!0;var Oc=class extends Kt{constructor(e=null,t=1,a=1,r=1){super(null),this.image={data:e,width:t,height:a,depth:r},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=da,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.needsUpdate=!0}};Oc.prototype.isDataTexture3D=!0;var Z1=new Kt,cI=new zc,fI=new Oc,J1=new jr,qb=[],$b=[],jb=new Float32Array(16),Xb=new Float32Array(9),Yb=new Float32Array(4);function oo(n,e,t){let a=n[0];if(a<=0||a>0)return n;let r=e*t,i=qb[r];if(i===void 0&&(i=new Float32Array(r),qb[r]=i),e!==0){a.toArray(i,0);for(let s=1,l=0;s!==e;++s)l+=t,n[s].toArray(i,l)}return i}function ln(n,e){if(n.length!==e.length)return!1;for(let t=0,a=n.length;t<a;t++)if(n[t]!==e[t])return!1;return!0}function en(n,e){for(let t=0,a=e.length;t<a;t++)n[t]=e[t]}function Q1(n,e){let t=$b[e];t===void 0&&(t=new Int32Array(e),$b[e]=t);for(let a=0;a!==e;++a)t[a]=n.allocateTextureUnit();return t}function pI(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function hI(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ln(t,e))return;n.uniform2fv(this.addr,e),en(t,e)}}function mI(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ln(t,e))return;n.uniform3fv(this.addr,e),en(t,e)}}function gI(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ln(t,e))return;n.uniform4fv(this.addr,e),en(t,e)}}function xI(n,e){let t=this.cache,a=e.elements;if(a===void 0){if(ln(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),en(t,e)}else{if(ln(t,a))return;Yb.set(a),n.uniformMatrix2fv(this.addr,!1,Yb),en(t,a)}}function vI(n,e){let t=this.cache,a=e.elements;if(a===void 0){if(ln(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),en(t,e)}else{if(ln(t,a))return;Xb.set(a),n.uniformMatrix3fv(this.addr,!1,Xb),en(t,a)}}function yI(n,e){let t=this.cache,a=e.elements;if(a===void 0){if(ln(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),en(t,e)}else{if(ln(t,a))return;jb.set(a),n.uniformMatrix4fv(this.addr,!1,jb),en(t,a)}}function bI(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function wI(n,e){let t=this.cache;ln(t,e)||(n.uniform2iv(this.addr,e),en(t,e))}function SI(n,e){let t=this.cache;ln(t,e)||(n.uniform3iv(this.addr,e),en(t,e))}function MI(n,e){let t=this.cache;ln(t,e)||(n.uniform4iv(this.addr,e),en(t,e))}function _I(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function LI(n,e){let t=this.cache;ln(t,e)||(n.uniform2uiv(this.addr,e),en(t,e))}function CI(n,e){let t=this.cache;ln(t,e)||(n.uniform3uiv(this.addr,e),en(t,e))}function EI(n,e){let t=this.cache;ln(t,e)||(n.uniform4uiv(this.addr,e),en(t,e))}function II(n,e,t){let a=this.cache,r=t.allocateTextureUnit();a[0]!==r&&(n.uniform1i(this.addr,r),a[0]=r),t.safeSetTexture2D(e||Z1,r)}function TI(n,e,t){let a=this.cache,r=t.allocateTextureUnit();a[0]!==r&&(n.uniform1i(this.addr,r),a[0]=r),t.setTexture3D(e||fI,r)}function AI(n,e,t){let a=this.cache,r=t.allocateTextureUnit();a[0]!==r&&(n.uniform1i(this.addr,r),a[0]=r),t.safeSetTextureCube(e||J1,r)}function kI(n,e,t){let a=this.cache,r=t.allocateTextureUnit();a[0]!==r&&(n.uniform1i(this.addr,r),a[0]=r),t.setTexture2DArray(e||cI,r)}function NI(n){switch(n){case 5126:return pI;case 35664:return hI;case 35665:return mI;case 35666:return gI;case 35674:return xI;case 35675:return vI;case 35676:return yI;case 5124:case 35670:return bI;case 35667:case 35671:return wI;case 35668:case 35672:return SI;case 35669:case 35673:return MI;case 5125:return _I;case 36294:return LI;case 36295:return CI;case 36296:return EI;case 35678:case 36198:case 36298:case 36306:case 35682:return II;case 35679:case 36299:case 36307:return TI;case 35680:case 36300:case 36308:case 36293:return AI;case 36289:case 36303:case 36311:case 36292:return kI}}function PI(n,e){n.uniform1fv(this.addr,e)}function DI(n,e){let t=oo(e,this.size,2);n.uniform2fv(this.addr,t)}function FI(n,e){let t=oo(e,this.size,3);n.uniform3fv(this.addr,t)}function BI(n,e){let t=oo(e,this.size,4);n.uniform4fv(this.addr,t)}function zI(n,e){let t=oo(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function OI(n,e){let t=oo(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function HI(n,e){let t=oo(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function UI(n,e){n.uniform1iv(this.addr,e)}function RI(n,e){n.uniform2iv(this.addr,e)}function GI(n,e){n.uniform3iv(this.addr,e)}function VI(n,e){n.uniform4iv(this.addr,e)}function WI(n,e){n.uniform1uiv(this.addr,e)}function qI(n,e){n.uniform2uiv(this.addr,e)}function $I(n,e){n.uniform3uiv(this.addr,e)}function jI(n,e){n.uniform4uiv(this.addr,e)}function XI(n,e,t){let a=e.length,r=Q1(t,a);n.uniform1iv(this.addr,r);for(let i=0;i!==a;++i)t.safeSetTexture2D(e[i]||Z1,r[i])}function YI(n,e,t){let a=e.length,r=Q1(t,a);n.uniform1iv(this.addr,r);for(let i=0;i!==a;++i)t.safeSetTextureCube(e[i]||J1,r[i])}function ZI(n){switch(n){case 5126:return PI;case 35664:return DI;case 35665:return FI;case 35666:return BI;case 35674:return zI;case 35675:return OI;case 35676:return HI;case 5124:case 35670:return UI;case 35667:case 35671:return RI;case 35668:case 35672:return GI;case 35669:case 35673:return VI;case 5125:return WI;case 36294:return qI;case 36295:return $I;case 36296:return jI;case 35678:case 36198:case 36298:case 36306:case 35682:return XI;case 35680:case 36300:case 36308:case 36293:return YI}}function JI(n,e,t){this.id=n,this.addr=t,this.cache=[],this.setValue=NI(e.type)}function K1(n,e,t){this.id=n,this.addr=t,this.cache=[],this.size=e.size,this.setValue=ZI(e.type)}K1.prototype.updateCache=function(n){let e=this.cache;n instanceof Float32Array&&e.length!==n.length&&(this.cache=new Float32Array(n.length)),en(e,n)};function ew(n){this.id=n,this.seq=[],this.map={}}ew.prototype.setValue=function(n,e,t){let a=this.seq;for(let r=0,i=a.length;r!==i;++r){let s=a[r];s.setValue(n,e[s.id],t)}};var Am=/(\w+)(\])?(\[|\.)?/g;function Zb(n,e){n.seq.push(e),n.map[e.id]=e}function QI(n,e,t){let a=n.name,r=a.length;for(Am.lastIndex=0;;){let i=Am.exec(a),s=Am.lastIndex,l=i[1],u=i[2]==="]",d=i[3];if(u&&(l=l|0),d===void 0||d==="["&&s+2===r){Zb(t,d===void 0?new JI(l,n,e):new K1(l,n,e));break}else{let p=t.map[l];p===void 0&&(p=new ew(l),Zb(t,p)),t=p}}}function Rr(n,e){this.seq=[],this.map={};let t=n.getProgramParameter(e,35718);for(let a=0;a<t;++a){let r=n.getActiveUniform(e,a),i=n.getUniformLocation(e,r.name);QI(r,i,this)}}Rr.prototype.setValue=function(n,e,t,a){let r=this.map[e];r!==void 0&&r.setValue(n,t,a)};Rr.prototype.setOptional=function(n,e,t){let a=e[t];a!==void 0&&this.setValue(n,t,a)};Rr.upload=function(n,e,t,a){for(let r=0,i=e.length;r!==i;++r){let s=e[r],l=t[s.id];l.needsUpdate!==!1&&s.setValue(n,l.value,a)}};Rr.seqWithValue=function(n,e){let t=[];for(let a=0,r=n.length;a!==r;++a){let i=n[a];i.id in e&&t.push(i)}return t};function Jb(n,e,t){let a=n.createShader(e);return n.shaderSource(a,t),n.compileShader(a),a}var KI=0;function eT(n){let e=n.split(`
`);for(let t=0;t<e.length;t++)e[t]=t+1+": "+e[t];return e.join(`
`)}function tw(n){switch(n){case Sn:return["Linear","( value )"];case Aa:return["sRGB","( value )"];case a0:return["RGBE","( value )"];case W1:return["RGBM","( value, 7.0 )"];case q1:return["RGBM","( value, 16.0 )"];case $1:return["RGBD","( value, 256.0 )"];case n0:return["Gamma","( value, float( GAMMA_FACTOR ) )"];case iL:return["LogLuv","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",n),["Linear","( value )"]}}function Qb(n,e,t){let a=n.getShaderParameter(e,35713),r=n.getShaderInfoLog(e).trim();if(a&&r==="")return"";let i=n.getShaderSource(e);return"THREE.WebGLShader: gl.getShaderInfoLog() "+t+`
`+r+eT(i)}function wl(n,e){let t=tw(e);return"vec4 "+n+"( vec4 value ) { return "+t[0]+"ToLinear"+t[1]+"; }"}function tT(n,e){let t=tw(e);return"vec4 "+n+"( vec4 value ) { return LinearTo"+t[0]+t[1]+"; }"}function nT(n,e){let t;switch(e){case r_:t="Linear";break;case i_:t="Reinhard";break;case s_:t="OptimizedCineon";break;case uf:t="ACESFilmic";break;case o_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function aT(n){return[n.extensionDerivatives||n.envMapCubeUV||n.bumpMap||n.tangentSpaceNormalMap||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Tl).join(`
`)}function rT(n){let e=[];for(let t in n){let a=n[t];a!==!1&&e.push("#define "+t+" "+a)}return e.join(`
`)}function iT(n,e){let t={},a=n.getProgramParameter(e,35721);for(let r=0;r<a;r++){let s=n.getActiveAttrib(e,r).name;t[s]=n.getAttribLocation(e,s)}return t}function Tl(n){return n!==""}function Kb(n,e){return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function e1(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var sT=/^[ \t]*#include +<([\w\d./]+)>/gm;function jm(n){return n.replace(sT,oT)}function oT(n,e){let t=We[e];if(t===void 0)throw new Error("Can not resolve #include <"+e+">");return jm(t)}var lT=/#pragma unroll_loop[\s]+?for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g,uT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function t1(n){return n.replace(uT,nw).replace(lT,dT)}function dT(n,e,t,a){return console.warn("WebGLProgram: #pragma unroll_loop shader syntax is deprecated. Please use #pragma unroll_loop_start syntax instead."),nw(n,e,t,a)}function nw(n,e,t,a){let r="";for(let i=parseInt(e);i<parseInt(t);i++)r+=a.replace(/\[\s*i\s*\]/g,"[ "+i+" ]").replace(/UNROLLED_LOOP_INDEX/g,i);return r}function n1(n){let e="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function cT(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===O1?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===B2?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Il&&(e="SHADOWMAP_TYPE_VSM"),e}function fT(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Jg:case Qg:e="ENVMAP_TYPE_CUBE";break;case df:case Kg:e="ENVMAP_TYPE_CUBE_UV";break}return e}function pT(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Qg:case Kg:e="ENVMAP_MODE_REFRACTION";break}return e}function hT(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case lf:e="ENVMAP_BLENDING_MULTIPLY";break;case n_:e="ENVMAP_BLENDING_MIX";break;case a_:e="ENVMAP_BLENDING_ADD";break}return e}function mT(n,e,t,a){let r=n.getContext(),i=t.defines,s=t.vertexShader,l=t.fragmentShader,u=cT(t),d=fT(t),f=pT(t),p=hT(t),c=n.gammaFactor>0?n.gammaFactor:1,m=t.isWebGL2?"":aT(t),g=rT(i),v=r.createProgram(),w,x,h=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(w=[g].filter(Tl).join(`
`),w.length>0&&(w+=`
`),x=[m,g].filter(Tl).join(`
`),x.length>0&&(x+=`
`)):(w=[n1(t),"#define SHADER_NAME "+t.shaderName,g,t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.supportsVertexTextures?"#define VERTEX_TEXTURES":"","#define GAMMA_FACTOR "+c,"#define MAX_BONES "+t.maxBones,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+f:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.displacementMap&&t.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.useVertexTexture?"#define BONE_TEXTURE":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Tl).join(`
`),x=[m,n1(t),"#define SHADER_NAME "+t.shaderName,g,t.alphaTest?"#define ALPHATEST "+t.alphaTest+(t.alphaTest%1?"":".0"):"","#define GAMMA_FACTOR "+c,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.envMap?"#define "+f:"",t.envMap?"#define "+p:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMap&&t.objectSpaceNormalMap?"#define OBJECTSPACE_NORMALMAP":"",t.normalMap&&t.tangentSpaceNormalMap?"#define TANGENTSPACE_NORMALMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.sheen?"#define USE_SHEEN":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.vertexTangents?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUvs?"#define USE_UV":"",t.uvsVertexOnly?"#define UVS_VERTEX_ONLY":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+u:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"",(t.extensionShaderTextureLOD||t.envMap)&&t.rendererExtensionShaderTextureLod?"#define TEXTURE_LOD_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ws?"#define TONE_MAPPING":"",t.toneMapping!==Ws?We.tonemapping_pars_fragment:"",t.toneMapping!==Ws?nT("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",We.encodings_pars_fragment,t.map?wl("mapTexelToLinear",t.mapEncoding):"",t.matcap?wl("matcapTexelToLinear",t.matcapEncoding):"",t.envMap?wl("envMapTexelToLinear",t.envMapEncoding):"",t.emissiveMap?wl("emissiveMapTexelToLinear",t.emissiveMapEncoding):"",t.lightMap?wl("lightMapTexelToLinear",t.lightMapEncoding):"",tT("linearToOutputTexel",t.outputEncoding),t.depthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Tl).join(`
`)),s=jm(s),s=Kb(s,t),s=e1(s,t),l=jm(l),l=Kb(l,t),l=e1(l,t),s=t1(s),l=t1(l),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(h=`#version 300 es
`,w=["#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+w,x=["#define varying in",t.glslVersion===Nb?"":"out highp vec4 pc_fragColor;",t.glslVersion===Nb?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);let y=h+w+s,_=h+x+l,b=Jb(r,35633,y),M=Jb(r,35632,_);if(r.attachShader(v,b),r.attachShader(v,M),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v),n.debug.checkShaderErrors){let E=r.getProgramInfoLog(v).trim(),B=r.getShaderInfoLog(b).trim(),$=r.getShaderInfoLog(M).trim(),G=!0,A=!0;if(r.getProgramParameter(v,35714)===!1){G=!1;let O=Qb(r,b,"vertex"),N=Qb(r,M,"fragment");console.error("THREE.WebGLProgram: shader error: ",r.getError(),"35715",r.getProgramParameter(v,35715),"gl.getProgramInfoLog",E,O,N)}else E!==""?console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()",E):(B===""||$==="")&&(A=!1);A&&(this.diagnostics={runnable:G,programLog:E,vertexShader:{log:B,prefix:w},fragmentShader:{log:$,prefix:x}})}r.deleteShader(b),r.deleteShader(M);let S;this.getUniforms=function(){return S===void 0&&(S=new Rr(r,v)),S};let k;return this.getAttributes=function(){return k===void 0&&(k=iT(r,v)),k},this.destroy=function(){a.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.name=t.shaderName,this.id=KI++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=b,this.fragmentShader=M,this}function gT(n,e,t,a,r,i){let s=[],l=a.isWebGL2,u=a.logarithmicDepthBuffer,d=a.floatVertexTextures,f=a.maxVertexUniforms,p=a.vertexTextures,c=a.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"},g=["precision","isWebGL2","supportsVertexTextures","outputEncoding","instancing","instancingColor","map","mapEncoding","matcap","matcapEncoding","envMap","envMapMode","envMapEncoding","envMapCubeUV","lightMap","lightMapEncoding","aoMap","emissiveMap","emissiveMapEncoding","bumpMap","normalMap","objectSpaceNormalMap","tangentSpaceNormalMap","clearcoatMap","clearcoatRoughnessMap","clearcoatNormalMap","displacementMap","specularMap","roughnessMap","metalnessMap","gradientMap","alphaMap","combine","vertexColors","vertexAlphas","vertexTangents","vertexUvs","uvsVertexOnly","fog","useFog","fogExp2","flatShading","sizeAttenuation","logarithmicDepthBuffer","skinning","maxBones","useVertexTexture","morphTargets","morphNormals","premultipliedAlpha","numDirLights","numPointLights","numSpotLights","numHemiLights","numRectAreaLights","numDirLightShadows","numPointLightShadows","numSpotLightShadows","shadowMapEnabled","shadowMapType","toneMapping","physicallyCorrectLights","alphaTest","doubleSided","flipSided","numClippingPlanes","numClipIntersection","depthPacking","dithering","sheen","transmissionMap"];function v(M){let k=M.skeleton.bones;if(d)return 1024;{let B=Math.floor((f-20)/4),$=Math.min(B,k.length);return $<k.length?(console.warn("THREE.WebGLRenderer: Skeleton has "+k.length+" bones. This GPU supports "+$+"."),0):$}}function w(M){let S;return M&&M.isTexture?S=M.encoding:M&&M.isWebGLRenderTarget?(console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."),S=M.texture.encoding):S=Sn,S}function x(M,S,k,E,B){let $=E.fog,G=M.isMeshStandardMaterial?E.environment:null,A=e.get(M.envMap||G),O=m[M.type],N=B.isSkinnedMesh?v(B):0;M.precision!==null&&(c=a.getMaxPrecision(M.precision),c!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",c,"instead."));let C,W;if(O){let K=La[O];C=K.vertexShader,W=K.fragmentShader}else C=M.vertexShader,W=M.fragmentShader;let X=n.getRenderTarget();return{isWebGL2:l,shaderID:O,shaderName:M.type,vertexShader:C,fragmentShader:W,defines:M.defines,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:c,instancing:B.isInstancedMesh===!0,instancingColor:B.isInstancedMesh===!0&&B.instanceColor!==null,supportsVertexTextures:p,outputEncoding:X!==null?w(X.texture):n.outputEncoding,map:!!M.map,mapEncoding:w(M.map),matcap:!!M.matcap,matcapEncoding:w(M.matcap),envMap:!!A,envMapMode:A&&A.mapping,envMapEncoding:w(A),envMapCubeUV:!!A&&(A.mapping===df||A.mapping===Kg),lightMap:!!M.lightMap,lightMapEncoding:w(M.lightMap),aoMap:!!M.aoMap,emissiveMap:!!M.emissiveMap,emissiveMapEncoding:w(M.emissiveMap),bumpMap:!!M.bumpMap,normalMap:!!M.normalMap,objectSpaceNormalMap:M.normalMapType===lL,tangentSpaceNormalMap:M.normalMapType===so,clearcoatMap:!!M.clearcoatMap,clearcoatRoughnessMap:!!M.clearcoatRoughnessMap,clearcoatNormalMap:!!M.clearcoatNormalMap,displacementMap:!!M.displacementMap,roughnessMap:!!M.roughnessMap,metalnessMap:!!M.metalnessMap,specularMap:!!M.specularMap,alphaMap:!!M.alphaMap,gradientMap:!!M.gradientMap,sheen:!!M.sheen,transmissionMap:!!M.transmissionMap,combine:M.combine,vertexTangents:M.normalMap&&M.vertexTangents,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&B.geometry&&B.geometry.attributes.color&&B.geometry.attributes.color.itemSize===4,vertexUvs:!!M.map||!!M.bumpMap||!!M.normalMap||!!M.specularMap||!!M.alphaMap||!!M.emissiveMap||!!M.roughnessMap||!!M.metalnessMap||!!M.clearcoatMap||!!M.clearcoatRoughnessMap||!!M.clearcoatNormalMap||!!M.displacementMap||!!M.transmissionMap,uvsVertexOnly:!(M.map||M.bumpMap||M.normalMap||M.specularMap||M.alphaMap||M.emissiveMap||M.roughnessMap||M.metalnessMap||M.clearcoatNormalMap||M.transmissionMap)&&!!M.displacementMap,fog:!!$,useFog:M.fog,fogExp2:$&&$.isFogExp2,flatShading:!!M.flatShading,sizeAttenuation:M.sizeAttenuation,logarithmicDepthBuffer:u,skinning:M.skinning&&N>0,maxBones:N,useVertexTexture:d,morphTargets:M.morphTargets,morphNormals:M.morphNormals,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numClippingPlanes:i.numPlanes,numClipIntersection:i.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&k.length>0,shadowMapType:n.shadowMap.type,toneMapping:M.toneMapped?n.toneMapping:Ws,physicallyCorrectLights:n.physicallyCorrectLights,premultipliedAlpha:M.premultipliedAlpha,alphaTest:M.alphaTest,doubleSided:M.side===of,flipSided:M.side===Dt,depthPacking:M.depthPacking!==void 0?M.depthPacking:!1,index0AttributeName:M.index0AttributeName,extensionDerivatives:M.extensions&&M.extensions.derivatives,extensionFragDepth:M.extensions&&M.extensions.fragDepth,extensionDrawBuffers:M.extensions&&M.extensions.drawBuffers,extensionShaderTextureLOD:M.extensions&&M.extensions.shaderTextureLOD,rendererExtensionFragDepth:l||t.has("EXT_frag_depth"),rendererExtensionDrawBuffers:l||t.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:l||t.has("EXT_shader_texture_lod"),customProgramCacheKey:M.customProgramCacheKey()}}function h(M){let S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.fragmentShader),S.push(M.vertexShader)),M.defines!==void 0)for(let k in M.defines)S.push(k),S.push(M.defines[k]);if(M.isRawShaderMaterial===!1){for(let k=0;k<g.length;k++)S.push(M[g[k]]);S.push(n.outputEncoding),S.push(n.gammaFactor)}return S.push(M.customProgramCacheKey),S.join()}function y(M){let S=m[M.type],k;if(S){let E=La[S];k=CL.clone(E.uniforms)}else k=M.uniforms;return k}function _(M,S){let k;for(let E=0,B=s.length;E<B;E++){let $=s[E];if($.cacheKey===S){k=$,++k.usedTimes;break}}return k===void 0&&(k=new mT(n,S,M,r),s.push(k)),k}function b(M){if(--M.usedTimes===0){let S=s.indexOf(M);s[S]=s[s.length-1],s.pop(),M.destroy()}}return{getParameters:x,getProgramCacheKey:h,getUniforms:y,acquireProgram:_,releaseProgram:b,programs:s}}function xT(){let n=new WeakMap;function e(i){let s=n.get(i);return s===void 0&&(s={},n.set(i,s)),s}function t(i){n.delete(i)}function a(i,s,l){n.get(i)[s]=l}function r(){n=new WeakMap}return{get:e,remove:t,update:a,dispose:r}}function vT(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.program!==e.program?n.program.id-e.program.id:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function yT(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function a1(n){let e=[],t=0,a=[],r=[],i={id:-1};function s(){t=0,a.length=0,r.length=0}function l(c,m,g,v,w,x){let h=e[t],y=n.get(g);return h===void 0?(h={id:c.id,object:c,geometry:m,material:g,program:y.program||i,groupOrder:v,renderOrder:c.renderOrder,z:w,group:x},e[t]=h):(h.id=c.id,h.object=c,h.geometry=m,h.material=g,h.program=y.program||i,h.groupOrder=v,h.renderOrder=c.renderOrder,h.z=w,h.group=x),t++,h}function u(c,m,g,v,w,x){let h=l(c,m,g,v,w,x);(g.transparent===!0?r:a).push(h)}function d(c,m,g,v,w,x){let h=l(c,m,g,v,w,x);(g.transparent===!0?r:a).unshift(h)}function f(c,m){a.length>1&&a.sort(c||vT),r.length>1&&r.sort(m||yT)}function p(){for(let c=t,m=e.length;c<m;c++){let g=e[c];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.program=null,g.group=null}}return{opaque:a,transparent:r,init:s,push:u,unshift:d,finish:p,sort:f}}function bT(n){let e=new WeakMap;function t(r,i){let s;return e.has(r)===!1?(s=new a1(n),e.set(r,[s])):i>=e.get(r).length?(s=new a1(n),e.get(r).push(s)):s=e.get(r)[i],s}function a(){e=new WeakMap}return{get:t,dispose:a}}function wT(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Ce};break;case"SpotLight":t={position:new D,direction:new D,color:new Ce,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Ce,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Ce,groundColor:new Ce};break;case"RectAreaLight":t={color:new Ce,position:new D,halfWidth:new D,halfHeight:new D};break}return n[e.id]=t,t}}}function ST(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var MT=0;function _T(n,e){return(e.castShadow?1:0)-(n.castShadow?1:0)}function LT(n,e){let t=new wT,a=ST(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadow:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[]};for(let f=0;f<9;f++)r.probe.push(new D);let i=new D,s=new Fe,l=new Fe;function u(f){let p=0,c=0,m=0;for(let S=0;S<9;S++)r.probe[S].set(0,0,0);let g=0,v=0,w=0,x=0,h=0,y=0,_=0,b=0;f.sort(_T);for(let S=0,k=f.length;S<k;S++){let E=f[S],B=E.color,$=E.intensity,G=E.distance,A=E.shadow&&E.shadow.map?E.shadow.map.texture:null;if(E.isAmbientLight)p+=B.r*$,c+=B.g*$,m+=B.b*$;else if(E.isLightProbe)for(let O=0;O<9;O++)r.probe[O].addScaledVector(E.sh.coefficients[O],$);else if(E.isDirectionalLight){let O=t.get(E);if(O.color.copy(E.color).multiplyScalar(E.intensity),E.castShadow){let N=E.shadow,C=a.get(E);C.shadowBias=N.bias,C.shadowNormalBias=N.normalBias,C.shadowRadius=N.radius,C.shadowMapSize=N.mapSize,r.directionalShadow[g]=C,r.directionalShadowMap[g]=A,r.directionalShadowMatrix[g]=E.shadow.matrix,y++}r.directional[g]=O,g++}else if(E.isSpotLight){let O=t.get(E);if(O.position.setFromMatrixPosition(E.matrixWorld),O.color.copy(B).multiplyScalar($),O.distance=G,O.coneCos=Math.cos(E.angle),O.penumbraCos=Math.cos(E.angle*(1-E.penumbra)),O.decay=E.decay,E.castShadow){let N=E.shadow,C=a.get(E);C.shadowBias=N.bias,C.shadowNormalBias=N.normalBias,C.shadowRadius=N.radius,C.shadowMapSize=N.mapSize,r.spotShadow[w]=C,r.spotShadowMap[w]=A,r.spotShadowMatrix[w]=E.shadow.matrix,b++}r.spot[w]=O,w++}else if(E.isRectAreaLight){let O=t.get(E);O.color.copy(B).multiplyScalar($),O.halfWidth.set(E.width*.5,0,0),O.halfHeight.set(0,E.height*.5,0),r.rectArea[x]=O,x++}else if(E.isPointLight){let O=t.get(E);if(O.color.copy(E.color).multiplyScalar(E.intensity),O.distance=E.distance,O.decay=E.decay,E.castShadow){let N=E.shadow,C=a.get(E);C.shadowBias=N.bias,C.shadowNormalBias=N.normalBias,C.shadowRadius=N.radius,C.shadowMapSize=N.mapSize,C.shadowCameraNear=N.camera.near,C.shadowCameraFar=N.camera.far,r.pointShadow[v]=C,r.pointShadowMap[v]=A,r.pointShadowMatrix[v]=E.shadow.matrix,_++}r.point[v]=O,v++}else if(E.isHemisphereLight){let O=t.get(E);O.skyColor.copy(E.color).multiplyScalar($),O.groundColor.copy(E.groundColor).multiplyScalar($),r.hemi[h]=O,h++}}x>0&&(e.isWebGL2||n.has("OES_texture_float_linear")===!0?(r.rectAreaLTC1=be.LTC_FLOAT_1,r.rectAreaLTC2=be.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(r.rectAreaLTC1=be.LTC_HALF_1,r.rectAreaLTC2=be.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),r.ambient[0]=p,r.ambient[1]=c,r.ambient[2]=m;let M=r.hash;(M.directionalLength!==g||M.pointLength!==v||M.spotLength!==w||M.rectAreaLength!==x||M.hemiLength!==h||M.numDirectionalShadows!==y||M.numPointShadows!==_||M.numSpotShadows!==b)&&(r.directional.length=g,r.spot.length=w,r.rectArea.length=x,r.point.length=v,r.hemi.length=h,r.directionalShadow.length=y,r.directionalShadowMap.length=y,r.pointShadow.length=_,r.pointShadowMap.length=_,r.spotShadow.length=b,r.spotShadowMap.length=b,r.directionalShadowMatrix.length=y,r.pointShadowMatrix.length=_,r.spotShadowMatrix.length=b,M.directionalLength=g,M.pointLength=v,M.spotLength=w,M.rectAreaLength=x,M.hemiLength=h,M.numDirectionalShadows=y,M.numPointShadows=_,M.numSpotShadows=b,r.version=MT++)}function d(f,p){let c=0,m=0,g=0,v=0,w=0,x=p.matrixWorldInverse;for(let h=0,y=f.length;h<y;h++){let _=f[h];if(_.isDirectionalLight){let b=r.directional[c];b.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(x),c++}else if(_.isSpotLight){let b=r.spot[g];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(x),b.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(x),g++}else if(_.isRectAreaLight){let b=r.rectArea[v];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(x),l.identity(),s.copy(_.matrixWorld),s.premultiply(x),l.extractRotation(s),b.halfWidth.set(_.width*.5,0,0),b.halfHeight.set(0,_.height*.5,0),b.halfWidth.applyMatrix4(l),b.halfHeight.applyMatrix4(l),v++}else if(_.isPointLight){let b=r.point[m];b.position.setFromMatrixPosition(_.matrixWorld),b.position.applyMatrix4(x),m++}else if(_.isHemisphereLight){let b=r.hemi[w];b.direction.setFromMatrixPosition(_.matrixWorld),b.direction.transformDirection(x),b.direction.normalize(),w++}}}return{setup:u,setupView:d,state:r}}function r1(n,e){let t=new LT(n,e),a=[],r=[];function i(){a.length=0,r.length=0}function s(p){a.push(p)}function l(p){r.push(p)}function u(){t.setup(a)}function d(p){t.setupView(a,p)}return{init:i,state:{lightsArray:a,shadowsArray:r,lights:t},setupLights:u,setupLightsView:d,pushLight:s,pushShadow:l}}function CT(n,e){let t=new WeakMap;function a(i,s=0){let l;return t.has(i)===!1?(l=new r1(n,e),t.set(i,[l])):s>=t.get(i).length?(l=new r1(n,e),t.get(i).push(l)):l=t.get(i)[s],l}function r(){t=new WeakMap}return{get:a,dispose:r}}var Hc=class extends Bt{constructor(e){super(),this.type="MeshDepthMaterial",this.depthPacking=sL,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}};Hc.prototype.isMeshDepthMaterial=!0;var Uc=class extends Bt{constructor(e){super(),this.type="MeshDistanceMaterial",this.referencePosition=new D,this.nearDistance=1,this.farDistance=1e3,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.fog=!1,this.setValues(e)}copy(e){return super.copy(e),this.referencePosition.copy(e.referencePosition),this.nearDistance=e.nearDistance,this.farDistance=e.farDistance,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};Uc.prototype.isMeshDistanceMaterial=!0;var ET=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	float mean = 0.0;
	float squared_mean = 0.0;
	float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy ) / resolution ) );
	for ( float i = -1.0; i < 1.0 ; i += SAMPLE_RATE) {
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( i, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, i ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean * HALF_SAMPLE_RATE;
	squared_mean = squared_mean * HALF_SAMPLE_RATE;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`,IT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`;function aw(n,e,t){let a=new Ys,r=new le,i=new le,s=new Ye,l=[],u=[],d={},f=t.maxTextureSize,p={0:Dt,1:sf,2:of},c=new nr({defines:{SAMPLE_RATE:2/8,HALF_SAMPLE_RATE:1/8},uniforms:{shadow_pass:{value:null},resolution:{value:new le},radius:{value:4}},vertexShader:IT,fragmentShader:ET}),m=c.clone();m.defines.HORIZONTAL_PASS=1;let g=new et;g.setAttribute("position",new vt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Le(g,c),w=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=O1,this.render=function(M,S,k){if(w.enabled===!1||w.autoUpdate===!1&&w.needsUpdate===!1||M.length===0)return;let E=n.getRenderTarget(),B=n.getActiveCubeFace(),$=n.getActiveMipmapLevel(),G=n.state;G.setBlending(Ur),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);for(let A=0,O=M.length;A<O;A++){let N=M[A],C=N.shadow;if(C===void 0){console.warn("THREE.WebGLShadowMap:",N,"has no shadow.");continue}if(C.autoUpdate===!1&&C.needsUpdate===!1)continue;r.copy(C.mapSize);let W=C.getFrameExtents();if(r.multiply(W),i.copy(C.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(i.x=Math.floor(f/W.x),r.x=i.x*W.x,C.mapSize.x=i.x),r.y>f&&(i.y=Math.floor(f/W.y),r.y=i.y*W.y,C.mapSize.y=i.y)),C.map===null&&!C.isPointLightShadow&&this.type===Il){let R={minFilter:Wn,magFilter:Wn,format:qn};C.map=new Ea(r.x,r.y,R),C.map.texture.name=N.name+".shadowMap",C.mapPass=new Ea(r.x,r.y,R),C.camera.updateProjectionMatrix()}if(C.map===null){let R={minFilter:Rt,magFilter:Rt,format:qn};C.map=new Ea(r.x,r.y,R),C.map.texture.name=N.name+".shadowMap",C.camera.updateProjectionMatrix()}n.setRenderTarget(C.map),n.clear();let X=C.getViewportCount();for(let R=0;R<X;R++){let K=C.getViewport(R);s.set(i.x*K.x,i.y*K.y,i.x*K.z,i.y*K.w),G.viewport(s),C.updateMatrices(N,R),a=C.getFrustum(),b(S,k,C.camera,N,this.type)}!C.isPointLightShadow&&this.type===Il&&x(C,k),C.needsUpdate=!1}w.needsUpdate=!1,n.setRenderTarget(E,B,$)};function x(M,S){let k=e.update(v);c.uniforms.shadow_pass.value=M.map.texture,c.uniforms.resolution.value=M.mapSize,c.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(S,null,k,c,v,null),m.uniforms.shadow_pass.value=M.mapPass.texture,m.uniforms.resolution.value=M.mapSize,m.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(S,null,k,m,v,null)}function h(M,S,k){let E=M<<0|S<<1|k<<2,B=l[E];return B===void 0&&(B=new Hc({depthPacking:oL,morphTargets:M,skinning:S}),l[E]=B),B}function y(M,S,k){let E=M<<0|S<<1|k<<2,B=u[E];return B===void 0&&(B=new Uc({morphTargets:M,skinning:S}),u[E]=B),B}function _(M,S,k,E,B,$,G){let A=null,O=h,N=M.customDepthMaterial;if(E.isPointLight===!0&&(O=y,N=M.customDistanceMaterial),N===void 0){let C=!1;k.morphTargets===!0&&(C=S.morphAttributes&&S.morphAttributes.position&&S.morphAttributes.position.length>0);let W=!1;M.isSkinnedMesh===!0&&(k.skinning===!0?W=!0:console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:",M));let X=M.isInstancedMesh===!0;A=O(C,W,X)}else A=N;if(n.localClippingEnabled&&k.clipShadows===!0&&k.clippingPlanes.length!==0){let C=A.uuid,W=k.uuid,X=d[C];X===void 0&&(X={},d[C]=X);let R=X[W];R===void 0&&(R=A.clone(),X[W]=R),A=R}return A.visible=k.visible,A.wireframe=k.wireframe,G===Il?A.side=k.shadowSide!==null?k.shadowSide:k.side:A.side=k.shadowSide!==null?k.shadowSide:p[k.side],A.clipShadows=k.clipShadows,A.clippingPlanes=k.clippingPlanes,A.clipIntersection=k.clipIntersection,A.wireframeLinewidth=k.wireframeLinewidth,A.linewidth=k.linewidth,E.isPointLight===!0&&A.isMeshDistanceMaterial===!0&&(A.referencePosition.setFromMatrixPosition(E.matrixWorld),A.nearDistance=B,A.farDistance=$),A}function b(M,S,k,E,B){if(M.visible===!1)return;if(M.layers.test(S.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&B===Il)&&(!M.frustumCulled||a.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,M.matrixWorld);let A=e.update(M),O=M.material;if(Array.isArray(O)){let N=A.groups;for(let C=0,W=N.length;C<W;C++){let X=N[C],R=O[X.materialIndex];if(R&&R.visible){let K=_(M,A,R,E,k.near,k.far,B);n.renderBufferDirect(k,null,A,K,M,X)}}}else if(O.visible){let N=_(M,A,O,E,k.near,k.far,B);n.renderBufferDirect(k,null,A,N,M,null)}}let G=M.children;for(let A=0,O=G.length;A<O;A++)b(G[A],S,k,E,B)}}function TT(n,e,t){let a=t.isWebGL2;function r(){let U=!1,me=new Ye,ve=null,Ee=new Ye(0,0,0,0);return{setMask:function(ae){ve!==ae&&!U&&(n.colorMask(ae,ae,ae,ae),ve=ae)},setLocked:function(ae){U=ae},setClear:function(ae,Oe,$e,st,hn){hn===!0&&(ae*=st,Oe*=st,$e*=st),me.set(ae,Oe,$e,st),Ee.equals(me)===!1&&(n.clearColor(ae,Oe,$e,st),Ee.copy(me))},reset:function(){U=!1,ve=null,Ee.set(-1,0,0,0)}}}function i(){let U=!1,me=null,ve=null,Ee=null;return{setTest:function(ae){ae?Y(2929):J(2929)},setMask:function(ae){me!==ae&&!U&&(n.depthMask(ae),me=ae)},setFunc:function(ae){if(ve!==ae){if(ae)switch(ae){case Y2:n.depthFunc(512);break;case Z2:n.depthFunc(519);break;case J2:n.depthFunc(513);break;case Um:n.depthFunc(515);break;case Q2:n.depthFunc(514);break;case K2:n.depthFunc(518);break;case e_:n.depthFunc(516);break;case t_:n.depthFunc(517);break;default:n.depthFunc(515)}else n.depthFunc(515);ve=ae}},setLocked:function(ae){U=ae},setClear:function(ae){Ee!==ae&&(n.clearDepth(ae),Ee=ae)},reset:function(){U=!1,me=null,ve=null,Ee=null}}}function s(){let U=!1,me=null,ve=null,Ee=null,ae=null,Oe=null,$e=null,st=null,hn=null;return{setTest:function(tt){U||(tt?Y(2960):J(2960))},setMask:function(tt){me!==tt&&!U&&(n.stencilMask(tt),me=tt)},setFunc:function(tt,ke,Ie){(ve!==tt||Ee!==ke||ae!==Ie)&&(n.stencilFunc(tt,ke,Ie),ve=tt,Ee=ke,ae=Ie)},setOp:function(tt,ke,Ie){(Oe!==tt||$e!==ke||st!==Ie)&&(n.stencilOp(tt,ke,Ie),Oe=tt,$e=ke,st=Ie)},setLocked:function(tt){U=tt},setClear:function(tt){hn!==tt&&(n.clearStencil(tt),hn=tt)},reset:function(){U=!1,me=null,ve=null,Ee=null,ae=null,Oe=null,$e=null,st=null,hn=null}}}let l=new r,u=new i,d=new s,f={},p=null,c={},m=null,g=!1,v=null,w=null,x=null,h=null,y=null,_=null,b=null,M=!1,S=null,k=null,E=null,B=null,$=null,G=n.getParameter(35661),A=!1,O=0,N=n.getParameter(7938);N.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(N)[1]),A=O>=1):N.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),A=O>=2);let C=null,W={},X=new Ye(0,0,n.canvas.width,n.canvas.height),R=new Ye(0,0,n.canvas.width,n.canvas.height);function K(U,me,ve){let Ee=new Uint8Array(4),ae=n.createTexture();n.bindTexture(U,ae),n.texParameteri(U,10241,9728),n.texParameteri(U,10240,9728);for(let Oe=0;Oe<ve;Oe++)n.texImage2D(me+Oe,0,6408,1,1,0,6408,5121,Ee);return ae}let ne={};ne[3553]=K(3553,3553,1),ne[34067]=K(34067,34069,6),l.setClear(0,0,0,1),u.setClear(1),d.setClear(0),Y(2929),u.setFunc(Um),ze(!1),re(pb),Y(2884),Ne(Ur);function Y(U){f[U]!==!0&&(n.enable(U),f[U]=!0)}function J(U){f[U]!==!1&&(n.disable(U),f[U]=!1)}function z(U){U!==p&&(n.bindFramebuffer(36160,U),p=U)}function q(U,me){me===null&&p!==null&&(me=p),c[U]!==me&&(n.bindFramebuffer(U,me),c[U]=me,a&&(U===36009&&(c[36160]=me),U===36160&&(c[36009]=me)))}function de(U){return m!==U?(n.useProgram(U),m=U,!0):!1}let ge={[Us]:32774,[O2]:32778,[H2]:32779};if(a)ge[gb]=32775,ge[xb]=32776;else{let U=e.get("EXT_blend_minmax");U!==null&&(ge[gb]=U.MIN_EXT,ge[xb]=U.MAX_EXT)}let ye={[U2]:0,[R2]:1,[G2]:768,[U1]:770,[X2]:776,[$2]:774,[W2]:772,[V2]:769,[R1]:771,[j2]:775,[q2]:773};function Ne(U,me,ve,Ee,ae,Oe,$e,st){if(U===Ur){g===!0&&(J(3042),g=!1);return}if(g===!1&&(Y(3042),g=!0),U!==z2){if(U!==v||st!==M){if((w!==Us||y!==Us)&&(n.blendEquation(32774),w=Us,y=Us),st)switch(U){case Al:n.blendFuncSeparate(1,771,1,771);break;case Cc:n.blendFunc(1,1);break;case hb:n.blendFuncSeparate(0,0,769,771);break;case mb:n.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Al:n.blendFuncSeparate(770,771,1,771);break;case Cc:n.blendFunc(770,1);break;case hb:n.blendFunc(0,769);break;case mb:n.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}x=null,h=null,_=null,b=null,v=U,M=st}return}ae=ae||me,Oe=Oe||ve,$e=$e||Ee,(me!==w||ae!==y)&&(n.blendEquationSeparate(ge[me],ge[ae]),w=me,y=ae),(ve!==x||Ee!==h||Oe!==_||$e!==b)&&(n.blendFuncSeparate(ye[ve],ye[Ee],ye[Oe],ye[$e]),x=ve,h=Ee,_=Oe,b=$e),v=U,M=null}function ce(U,me){U.side===of?J(2884):Y(2884);let ve=U.side===Dt;me&&(ve=!ve),ze(ve),U.blending===Al&&U.transparent===!1?Ne(Ur):Ne(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.premultipliedAlpha),u.setFunc(U.depthFunc),u.setTest(U.depthTest),u.setMask(U.depthWrite),l.setMask(U.colorWrite);let Ee=U.stencilWrite;d.setTest(Ee),Ee&&(d.setMask(U.stencilWriteMask),d.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),d.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),fe(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?Y(32926):J(32926)}function ze(U){S!==U&&(U?n.frontFace(2304):n.frontFace(2305),S=U)}function re(U){U!==D2?(Y(2884),U!==k&&(U===pb?n.cullFace(1029):U===F2?n.cullFace(1028):n.cullFace(1032))):J(2884),k=U}function se(U){U!==E&&(A&&n.lineWidth(U),E=U)}function fe(U,me,ve){U?(Y(32823),(B!==me||$!==ve)&&(n.polygonOffset(me,ve),B=me,$=ve)):J(32823)}function he(U){U?Y(3089):J(3089)}function H(U){U===void 0&&(U=33984+G-1),C!==U&&(n.activeTexture(U),C=U)}function L(U,me){C===null&&H();let ve=W[C];ve===void 0&&(ve={type:void 0,texture:void 0},W[C]=ve),(ve.type!==U||ve.texture!==me)&&(n.bindTexture(U,me||ne[U]),ve.type=U,ve.texture=me)}function T(){let U=W[C];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function j(){try{n.compressedTexImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{n.texImage2D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function pe(){try{n.texImage3D.apply(n,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function we(U){X.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),X.copy(U))}function Re(U){R.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),R.copy(U))}function Pe(){n.disable(3042),n.disable(2884),n.disable(2929),n.disable(32823),n.disable(3089),n.disable(2960),n.disable(32926),n.blendEquation(32774),n.blendFunc(1,0),n.blendFuncSeparate(1,0,1,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(513),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(519,0,4294967295),n.stencilOp(7680,7680,7680),n.clearStencil(0),n.cullFace(1029),n.frontFace(2305),n.polygonOffset(0,0),n.activeTexture(33984),n.bindFramebuffer(36160,null),a===!0&&(n.bindFramebuffer(36009,null),n.bindFramebuffer(36008,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},C=null,W={},p=null,c={},m=null,g=!1,v=null,w=null,x=null,h=null,y=null,_=null,b=null,M=!1,S=null,k=null,E=null,B=null,$=null,X.set(0,0,n.canvas.width,n.canvas.height),R.set(0,0,n.canvas.width,n.canvas.height),l.reset(),u.reset(),d.reset()}return{buffers:{color:l,depth:u,stencil:d},enable:Y,disable:J,bindFramebuffer:q,bindXRFramebuffer:z,useProgram:de,setBlending:Ne,setMaterial:ce,setFlipSided:ze,setCullFace:re,setLineWidth:se,setPolygonOffset:fe,setScissorTest:he,activeTexture:H,bindTexture:L,unbindTexture:T,compressedTexImage2D:j,texImage2D:Q,texImage3D:pe,scissor:we,viewport:Re,reset:Pe}}function AT(n,e,t,a,r,i,s){let l=r.isWebGL2,u=r.maxTextures,d=r.maxCubemapSize,f=r.maxTextureSize,p=r.maxSamples,c=new WeakMap,m,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(L,T){return g?new OffscreenCanvas(L,T):document.createElementNS("http://www.w3.org/1999/xhtml","canvas")}function w(L,T,j,Q){let pe=1;if((L.width>Q||L.height>Q)&&(pe=Q/Math.max(L.width,L.height)),pe<1||T===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap){let we=T?fL:Math.floor,Re=we(pe*L.width),Pe=we(pe*L.height);m===void 0&&(m=v(Re,Pe));let U=j?v(Re,Pe):m;return U.width=Re,U.height=Pe,U.getContext("2d").drawImage(L,0,0,Re,Pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+Re+"x"+Pe+")."),U}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function x(L){return Pb(L.width)&&Pb(L.height)}function h(L){return l?!1:L.wrapS!==da||L.wrapT!==da||L.minFilter!==Rt&&L.minFilter!==Wn}function y(L,T){return L.generateMipmaps&&T&&L.minFilter!==Rt&&L.minFilter!==Wn}function _(L,T,j,Q){n.generateMipmap(L);let pe=a.get(T);pe.__maxMipLevel=Math.log2(Math.max(j,Q))}function b(L,T,j){if(l===!1)return T;if(L!==null){if(n[L]!==void 0)return n[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Q=T;return T===6403&&(j===5126&&(Q=33326),j===5131&&(Q=33325),j===5121&&(Q=33321)),T===6407&&(j===5126&&(Q=34837),j===5131&&(Q=34843),j===5121&&(Q=32849)),T===6408&&(j===5126&&(Q=34836),j===5131&&(Q=34842),j===5121&&(Q=32856)),(Q===33325||Q===33326||Q===34842||Q===34836)&&e.get("EXT_color_buffer_float"),Q}function M(L){return L===Rt||L===bb||L===wb?9728:9729}function S(L){let T=L.target;T.removeEventListener("dispose",S),E(T),T.isVideoTexture&&c.delete(T),s.memory.textures--}function k(L){let T=L.target;T.removeEventListener("dispose",k),B(T),s.memory.textures--}function E(L){let T=a.get(L);T.__webglInit!==void 0&&(n.deleteTexture(T.__webglTexture),a.remove(L))}function B(L){let T=L.texture,j=a.get(L),Q=a.get(T);if(L){if(Q.__webglTexture!==void 0&&n.deleteTexture(Q.__webglTexture),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let pe=0;pe<6;pe++)n.deleteFramebuffer(j.__webglFramebuffer[pe]),j.__webglDepthbuffer&&n.deleteRenderbuffer(j.__webglDepthbuffer[pe]);else n.deleteFramebuffer(j.__webglFramebuffer),j.__webglDepthbuffer&&n.deleteRenderbuffer(j.__webglDepthbuffer),j.__webglMultisampledFramebuffer&&n.deleteFramebuffer(j.__webglMultisampledFramebuffer),j.__webglColorRenderbuffer&&n.deleteRenderbuffer(j.__webglColorRenderbuffer),j.__webglDepthRenderbuffer&&n.deleteRenderbuffer(j.__webglDepthRenderbuffer);a.remove(T),a.remove(L)}}let $=0;function G(){$=0}function A(){let L=$;return L>=u&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+u),$+=1,L}function O(L,T){let j=a.get(L);if(L.isVideoTexture&&re(L),L.version>0&&j.__version!==L.version){let Q=L.image;if(Q===void 0)console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(j,L,T);return}}t.activeTexture(33984+T),t.bindTexture(3553,j.__webglTexture)}function N(L,T){let j=a.get(L);if(L.version>0&&j.__version!==L.version){Y(j,L,T);return}t.activeTexture(33984+T),t.bindTexture(35866,j.__webglTexture)}function C(L,T){let j=a.get(L);if(L.version>0&&j.__version!==L.version){Y(j,L,T);return}t.activeTexture(33984+T),t.bindTexture(32879,j.__webglTexture)}function W(L,T){let j=a.get(L);if(L.version>0&&j.__version!==L.version){J(j,L,T);return}t.activeTexture(33984+T),t.bindTexture(34067,j.__webglTexture)}let X={[Rm]:10497,[da]:33071,[Gm]:33648},R={[Rt]:9728,[bb]:9984,[wb]:9986,[Wn]:9729,[l_]:9985,[e0]:9987};function K(L,T,j){if(j?(n.texParameteri(L,10242,X[T.wrapS]),n.texParameteri(L,10243,X[T.wrapT]),(L===32879||L===35866)&&n.texParameteri(L,32882,X[T.wrapR]),n.texParameteri(L,10240,R[T.magFilter]),n.texParameteri(L,10241,R[T.minFilter])):(n.texParameteri(L,10242,33071),n.texParameteri(L,10243,33071),(L===32879||L===35866)&&n.texParameteri(L,32882,33071),(T.wrapS!==da||T.wrapT!==da)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(L,10240,M(T.magFilter)),n.texParameteri(L,10241,M(T.minFilter)),T.minFilter!==Rt&&T.minFilter!==Wn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),e.has("EXT_texture_filter_anisotropic")===!0){let Q=e.get("EXT_texture_filter_anisotropic");if(T.type===Hr&&e.has("OES_texture_float_linear")===!1||l===!1&&T.type===Ic&&e.has("OES_texture_half_float_linear")===!1)return;(T.anisotropy>1||a.get(T).__currentAnisotropy)&&(n.texParameterf(L,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,r.getMaxAnisotropy())),a.get(T).__currentAnisotropy=T.anisotropy)}}function ne(L,T){L.__webglInit===void 0&&(L.__webglInit=!0,T.addEventListener("dispose",S),L.__webglTexture=n.createTexture(),s.memory.textures++)}function Y(L,T,j){let Q=3553;T.isDataTexture2DArray&&(Q=35866),T.isDataTexture3D&&(Q=32879),ne(L,T),t.activeTexture(33984+j),t.bindTexture(Q,L.__webglTexture),n.pixelStorei(37440,T.flipY),n.pixelStorei(37441,T.premultiplyAlpha),n.pixelStorei(3317,T.unpackAlignment),n.pixelStorei(37443,0);let pe=h(T)&&x(T.image)===!1,we=w(T.image,pe,!1,f),Re=x(we)||l,Pe=i.convert(T.format),U=i.convert(T.type),me=b(T.internalFormat,Pe,U);K(Q,T,Re);let ve,Ee=T.mipmaps;if(T.isDepthTexture)me=6402,l?T.type===Hr?me=36012:T.type===Lc?me=33190:T.type===kl?me=35056:me=33189:T.type===Hr&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),T.format===qs&&me===6402&&T.type!==Ec&&T.type!==Lc&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),T.type=Ec,U=i.convert(T.type)),T.format===Fl&&me===6402&&(me=34041,T.type!==kl&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),T.type=kl,U=i.convert(T.type))),t.texImage2D(3553,0,me,we.width,we.height,0,Pe,U,null);else if(T.isDataTexture)if(Ee.length>0&&Re){for(let ae=0,Oe=Ee.length;ae<Oe;ae++)ve=Ee[ae],t.texImage2D(3553,ae,me,ve.width,ve.height,0,Pe,U,ve.data);T.generateMipmaps=!1,L.__maxMipLevel=Ee.length-1}else t.texImage2D(3553,0,me,we.width,we.height,0,Pe,U,we.data),L.__maxMipLevel=0;else if(T.isCompressedTexture){for(let ae=0,Oe=Ee.length;ae<Oe;ae++)ve=Ee[ae],T.format!==qn&&T.format!==Ai?Pe!==null?t.compressedTexImage2D(3553,ae,me,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):t.texImage2D(3553,ae,me,ve.width,ve.height,0,Pe,U,ve.data);L.__maxMipLevel=Ee.length-1}else if(T.isDataTexture2DArray)t.texImage3D(35866,0,me,we.width,we.height,we.depth,0,Pe,U,we.data),L.__maxMipLevel=0;else if(T.isDataTexture3D)t.texImage3D(32879,0,me,we.width,we.height,we.depth,0,Pe,U,we.data),L.__maxMipLevel=0;else if(Ee.length>0&&Re){for(let ae=0,Oe=Ee.length;ae<Oe;ae++)ve=Ee[ae],t.texImage2D(3553,ae,me,Pe,U,ve);T.generateMipmaps=!1,L.__maxMipLevel=Ee.length-1}else t.texImage2D(3553,0,me,Pe,U,we),L.__maxMipLevel=0;y(T,Re)&&_(Q,T,we.width,we.height),L.__version=T.version,T.onUpdate&&T.onUpdate(T)}function J(L,T,j){if(T.image.length!==6)return;ne(L,T),t.activeTexture(33984+j),t.bindTexture(34067,L.__webglTexture),n.pixelStorei(37440,T.flipY),n.pixelStorei(37441,T.premultiplyAlpha),n.pixelStorei(3317,T.unpackAlignment),n.pixelStorei(37443,0);let Q=T&&(T.isCompressedTexture||T.image[0].isCompressedTexture),pe=T.image[0]&&T.image[0].isDataTexture,we=[];for(let ae=0;ae<6;ae++)!Q&&!pe?we[ae]=w(T.image[ae],!1,!0,d):we[ae]=pe?T.image[ae].image:T.image[ae];let Re=we[0],Pe=x(Re)||l,U=i.convert(T.format),me=i.convert(T.type),ve=b(T.internalFormat,U,me);K(34067,T,Pe);let Ee;if(Q){for(let ae=0;ae<6;ae++){Ee=we[ae].mipmaps;for(let Oe=0;Oe<Ee.length;Oe++){let $e=Ee[Oe];T.format!==qn&&T.format!==Ai?U!==null?t.compressedTexImage2D(34069+ae,Oe,ve,$e.width,$e.height,0,$e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):t.texImage2D(34069+ae,Oe,ve,$e.width,$e.height,0,U,me,$e.data)}}L.__maxMipLevel=Ee.length-1}else{Ee=T.mipmaps;for(let ae=0;ae<6;ae++)if(pe){t.texImage2D(34069+ae,0,ve,we[ae].width,we[ae].height,0,U,me,we[ae].data);for(let Oe=0;Oe<Ee.length;Oe++){let st=Ee[Oe].image[ae].image;t.texImage2D(34069+ae,Oe+1,ve,st.width,st.height,0,U,me,st.data)}}else{t.texImage2D(34069+ae,0,ve,U,me,we[ae]);for(let Oe=0;Oe<Ee.length;Oe++){let $e=Ee[Oe];t.texImage2D(34069+ae,Oe+1,ve,U,me,$e.image[ae])}}L.__maxMipLevel=Ee.length}y(T,Pe)&&_(34067,T,Re.width,Re.height),L.__version=T.version,T.onUpdate&&T.onUpdate(T)}function z(L,T,j,Q){let pe=T.texture,we=i.convert(pe.format),Re=i.convert(pe.type),Pe=b(pe.internalFormat,we,Re);Q===32879||Q===35866?t.texImage3D(Q,0,Pe,T.width,T.height,T.depth,0,we,Re,null):t.texImage2D(Q,0,Pe,T.width,T.height,0,we,Re,null),t.bindFramebuffer(36160,L),n.framebufferTexture2D(36160,j,Q,a.get(pe).__webglTexture,0),t.bindFramebuffer(36160,null)}function q(L,T,j){if(n.bindRenderbuffer(36161,L),T.depthBuffer&&!T.stencilBuffer){let Q=33189;if(j){let pe=T.depthTexture;pe&&pe.isDepthTexture&&(pe.type===Hr?Q=36012:pe.type===Lc&&(Q=33190));let we=ze(T);n.renderbufferStorageMultisample(36161,we,Q,T.width,T.height)}else n.renderbufferStorage(36161,Q,T.width,T.height);n.framebufferRenderbuffer(36160,36096,36161,L)}else if(T.depthBuffer&&T.stencilBuffer){if(j){let Q=ze(T);n.renderbufferStorageMultisample(36161,Q,35056,T.width,T.height)}else n.renderbufferStorage(36161,34041,T.width,T.height);n.framebufferRenderbuffer(36160,33306,36161,L)}else{let Q=T.texture,pe=i.convert(Q.format),we=i.convert(Q.type),Re=b(Q.internalFormat,pe,we);if(j){let Pe=ze(T);n.renderbufferStorageMultisample(36161,Pe,Re,T.width,T.height)}else n.renderbufferStorage(36161,Re,T.width,T.height)}n.bindRenderbuffer(36161,null)}function de(L,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(36160,L),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!a.get(T.depthTexture).__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),O(T.depthTexture,0);let Q=a.get(T.depthTexture).__webglTexture;if(T.depthTexture.format===qs)n.framebufferTexture2D(36160,36096,3553,Q,0);else if(T.depthTexture.format===Fl)n.framebufferTexture2D(36160,33306,3553,Q,0);else throw new Error("Unknown depthTexture format")}function ge(L){let T=a.get(L),j=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture){if(j)throw new Error("target.depthTexture not supported in Cube render targets");de(T.__webglFramebuffer,L)}else if(j){T.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)t.bindFramebuffer(36160,T.__webglFramebuffer[Q]),T.__webglDepthbuffer[Q]=n.createRenderbuffer(),q(T.__webglDepthbuffer[Q],L,!1)}else t.bindFramebuffer(36160,T.__webglFramebuffer),T.__webglDepthbuffer=n.createRenderbuffer(),q(T.__webglDepthbuffer,L,!1);t.bindFramebuffer(36160,null)}function ye(L){let T=L.texture,j=a.get(L),Q=a.get(T);L.addEventListener("dispose",k),Q.__webglTexture=n.createTexture(),Q.__version=T.version,s.memory.textures++;let pe=L.isWebGLCubeRenderTarget===!0,we=L.isWebGLMultisampleRenderTarget===!0,Re=T.isDataTexture3D||T.isDataTexture2DArray,Pe=x(L)||l;if(l&&T.format===Ai&&(T.type===Hr||T.type===Ic)&&(T.format=qn,console.warn("THREE.WebGLRenderer: Rendering to textures with RGB format is not supported. Using RGBA format instead.")),pe){j.__webglFramebuffer=[];for(let U=0;U<6;U++)j.__webglFramebuffer[U]=n.createFramebuffer()}else if(j.__webglFramebuffer=n.createFramebuffer(),we)if(l){j.__webglMultisampledFramebuffer=n.createFramebuffer(),j.__webglColorRenderbuffer=n.createRenderbuffer(),n.bindRenderbuffer(36161,j.__webglColorRenderbuffer);let U=i.convert(T.format),me=i.convert(T.type),ve=b(T.internalFormat,U,me),Ee=ze(L);n.renderbufferStorageMultisample(36161,Ee,ve,L.width,L.height),t.bindFramebuffer(36160,j.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(36160,36064,36161,j.__webglColorRenderbuffer),n.bindRenderbuffer(36161,null),L.depthBuffer&&(j.__webglDepthRenderbuffer=n.createRenderbuffer(),q(j.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(36160,null)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.");if(pe){t.bindTexture(34067,Q.__webglTexture),K(34067,T,Pe);for(let U=0;U<6;U++)z(j.__webglFramebuffer[U],L,36064,34069+U);y(T,Pe)&&_(34067,T,L.width,L.height),t.bindTexture(34067,null)}else{let U=3553;Re&&(l?U=T.isDataTexture3D?32879:35866:console.warn("THREE.DataTexture3D and THREE.DataTexture2DArray only supported with WebGL2.")),t.bindTexture(U,Q.__webglTexture),K(U,T,Pe),z(j.__webglFramebuffer,L,36064,U),y(T,Pe)&&_(3553,T,L.width,L.height),t.bindTexture(3553,null)}L.depthBuffer&&ge(L)}function Ne(L){let T=L.texture,j=x(L)||l;if(y(T,j)){let Q=L.isWebGLCubeRenderTarget?34067:3553,pe=a.get(T).__webglTexture;t.bindTexture(Q,pe),_(Q,T,L.width,L.height),t.bindTexture(Q,null)}}function ce(L){if(L.isWebGLMultisampleRenderTarget)if(l){let T=L.width,j=L.height,Q=16384;L.depthBuffer&&(Q|=256),L.stencilBuffer&&(Q|=1024);let pe=a.get(L);t.bindFramebuffer(36008,pe.__webglMultisampledFramebuffer),t.bindFramebuffer(36009,pe.__webglFramebuffer),n.blitFramebuffer(0,0,T,j,0,0,T,j,Q,9728),t.bindFramebuffer(36008,null),t.bindFramebuffer(36009,pe.__webglMultisampledFramebuffer)}else console.warn("THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.")}function ze(L){return l&&L.isWebGLMultisampleRenderTarget?Math.min(p,L.samples):0}function re(L){let T=s.render.frame;c.get(L)!==T&&(c.set(L,T),L.update())}let se=!1,fe=!1;function he(L,T){L&&L.isWebGLRenderTarget&&(se===!1&&(console.warn("THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead."),se=!0),L=L.texture),O(L,T)}function H(L,T){L&&L.isWebGLCubeRenderTarget&&(fe===!1&&(console.warn("THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead."),fe=!0),L=L.texture),W(L,T)}this.allocateTextureUnit=A,this.resetTextureUnits=G,this.setTexture2D=O,this.setTexture2DArray=N,this.setTexture3D=C,this.setTextureCube=W,this.setupRenderTarget=ye,this.updateRenderTargetMipmap=Ne,this.updateMultisampleRenderTarget=ce,this.safeSetTexture2D=he,this.safeSetTextureCube=H}function kT(n,e,t){let a=t.isWebGL2;function r(i){let s;if(i===tu)return 5121;if(i===f_)return 32819;if(i===p_)return 32820;if(i===h_)return 33635;if(i===u_)return 5120;if(i===d_)return 5122;if(i===Ec)return 5123;if(i===c_)return 5124;if(i===Lc)return 5125;if(i===Hr)return 5126;if(i===Ic)return a?5131:(s=e.get("OES_texture_half_float"),s!==null?s.HALF_FLOAT_OES:null);if(i===m_)return 6406;if(i===Ai)return 6407;if(i===qn)return 6408;if(i===g_)return 6409;if(i===x_)return 6410;if(i===qs)return 6402;if(i===Fl)return 34041;if(i===y_)return 6403;if(i===b_)return 36244;if(i===w_)return 33319;if(i===S_)return 33320;if(i===M_)return 36248;if(i===__)return 36249;if(i===Sb||i===Mb||i===_b||i===Lb)if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Sb)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Mb)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===_b)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Lb)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Cb||i===Eb||i===Ib||i===Tb)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Cb)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Eb)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ib)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Tb)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===L_)return s=e.get("WEBGL_compressed_texture_etc1"),s!==null?s.COMPRESSED_RGB_ETC1_WEBGL:null;if((i===Ab||i===kb)&&(s=e.get("WEBGL_compressed_texture_etc"),s!==null)){if(i===Ab)return s.COMPRESSED_RGB8_ETC2;if(i===kb)return s.COMPRESSED_RGBA8_ETC2_EAC}if(i===C_||i===E_||i===I_||i===T_||i===A_||i===k_||i===N_||i===P_||i===D_||i===F_||i===B_||i===z_||i===O_||i===H_||i===R_||i===G_||i===V_||i===W_||i===q_||i===$_||i===j_||i===X_||i===Y_||i===Z_||i===J_||i===Q_||i===K_||i===eL)return s=e.get("WEBGL_compressed_texture_astc"),s!==null?i:null;if(i===U_)return s=e.get("EXT_texture_compression_bptc"),s!==null?i:null;if(i===kl)return a?34042:(s=e.get("WEBGL_depth_texture"),s!==null?s.UNSIGNED_INT_24_8_WEBGL:null)}return{convert:r}}var Rc=class extends Ft{constructor(e=[]){super(),this.cameras=e}};Rc.prototype.isArrayCamera=!0;var xt=class extends Xe{constructor(){super(),this.type="Group"}};xt.prototype.isGroup=!0;var NT={type:"move"},Nl=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,a){let r=null,i=null,s=null,l=this._targetRay,u=this._grip,d=this._hand;if(e&&t.session.visibilityState!=="visible-blurred")if(l!==null&&(r=t.getPose(e.targetRaySpace,a),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(NT))),d&&e.hand){s=!0;for(let v of e.hand.values()){let w=t.getJointPose(v,a);if(d.joints[v.jointName]===void 0){let h=new xt;h.matrixAutoUpdate=!1,h.visible=!1,d.joints[v.jointName]=h,d.add(h)}let x=d.joints[v.jointName];w!==null&&(x.matrix.fromArray(w.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.jointRadius=w.radius),x.visible=w!==null}let f=d.joints["index-finger-tip"],p=d.joints["thumb-tip"],c=f.position.distanceTo(p.position),m=.02,g=.005;d.inputState.pinching&&c>m+g?(d.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!d.inputState.pinching&&c<=m-g&&(d.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else u!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,a),i!==null&&(u.matrix.fromArray(i.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),i.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(i.linearVelocity)):u.hasLinearVelocity=!1,i.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(i.angularVelocity)):u.hasAngularVelocity=!1));return l!==null&&(l.visible=r!==null),u!==null&&(u.visible=i!==null),d!==null&&(d.visible=s!==null),this}},Xm=class extends tr{constructor(e,t){super();let a=this,r=e.state,i=null,s=1,l=null,u="local-floor",d=null,f=[],p=new Map,c=new Ft;c.layers.enable(1),c.viewport=new Ye;let m=new Ft;m.layers.enable(2),m.viewport=new Ye;let g=[c,m],v=new Rc;v.layers.enable(1),v.layers.enable(2);let w=null,x=null;this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let A=f[G];return A===void 0&&(A=new Nl,f[G]=A),A.getTargetRaySpace()},this.getControllerGrip=function(G){let A=f[G];return A===void 0&&(A=new Nl,f[G]=A),A.getGripSpace()},this.getHand=function(G){let A=f[G];return A===void 0&&(A=new Nl,f[G]=A),A.getHandSpace()};function h(G){let A=p.get(G.inputSource);A&&A.dispatchEvent({type:G.type,data:G.inputSource})}function y(){p.forEach(function(G,A){G.disconnect(A)}),p.clear(),w=null,x=null,r.bindXRFramebuffer(null),e.setRenderTarget(e.getRenderTarget()),$.stop(),a.isPresenting=!1,a.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){s=G,a.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){u=G,a.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l},this.getSession=function(){return i},this.setSession=async function(G){if(i=G,i!==null){i.addEventListener("select",h),i.addEventListener("selectstart",h),i.addEventListener("selectend",h),i.addEventListener("squeeze",h),i.addEventListener("squeezestart",h),i.addEventListener("squeezeend",h),i.addEventListener("end",y),i.addEventListener("inputsourceschange",_);let A=t.getContextAttributes();A.xrCompatible!==!0&&await t.makeXRCompatible();let O={antialias:A.antialias,alpha:A.alpha,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:s},N=new XRWebGLLayer(i,t,O);i.updateRenderState({baseLayer:N}),l=await i.requestReferenceSpace(u),$.setContext(i),$.start(),a.isPresenting=!0,a.dispatchEvent({type:"sessionstart"})}};function _(G){let A=i.inputSources;for(let O=0;O<f.length;O++)p.set(A[O],f[O]);for(let O=0;O<G.removed.length;O++){let N=G.removed[O],C=p.get(N);C&&(C.dispatchEvent({type:"disconnected",data:N}),p.delete(N))}for(let O=0;O<G.added.length;O++){let N=G.added[O],C=p.get(N);C&&C.dispatchEvent({type:"connected",data:N})}}let b=new D,M=new D;function S(G,A,O){b.setFromMatrixPosition(A.matrixWorld),M.setFromMatrixPosition(O.matrixWorld);let N=b.distanceTo(M),C=A.projectionMatrix.elements,W=O.projectionMatrix.elements,X=C[14]/(C[10]-1),R=C[14]/(C[10]+1),K=(C[9]+1)/C[5],ne=(C[9]-1)/C[5],Y=(C[8]-1)/C[0],J=(W[8]+1)/W[0],z=X*Y,q=X*J,de=N/(-Y+J),ge=de*-Y;A.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(ge),G.translateZ(de),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert();let ye=X+de,Ne=R+de,ce=z-ge,ze=q+(N-ge),re=K*R/Ne*ye,se=ne*R/Ne*ye;G.projectionMatrix.makePerspective(ce,ze,re,se,ye,Ne)}function k(G,A){A===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(A.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.getCamera=function(G){v.near=m.near=c.near=G.near,v.far=m.far=c.far=G.far,(w!==v.near||x!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),w=v.near,x=v.far);let A=G.parent,O=v.cameras;k(v,A);for(let C=0;C<O.length;C++)k(O[C],A);G.matrixWorld.copy(v.matrixWorld),G.matrix.copy(v.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale);let N=G.children;for(let C=0,W=N.length;C<W;C++)N[C].updateMatrixWorld(!0);return O.length===2?S(v,c,m):v.projectionMatrix.copy(c.projectionMatrix),v};let E=null;function B(G,A){if(d=A.getViewerPose(l),d!==null){let N=d.views,C=i.renderState.baseLayer;r.bindXRFramebuffer(C.framebuffer);let W=!1;N.length!==v.cameras.length&&(v.cameras.length=0,W=!0);for(let X=0;X<N.length;X++){let R=N[X],K=C.getViewport(R),ne=g[X];ne.matrix.fromArray(R.transform.matrix),ne.projectionMatrix.fromArray(R.projectionMatrix),ne.viewport.set(K.x,K.y,K.width,K.height),X===0&&v.matrix.copy(ne.matrix),W===!0&&v.cameras.push(ne)}}let O=i.inputSources;for(let N=0;N<f.length;N++){let C=f[N],W=O[N];C.update(W,A,l)}E&&E(G,A)}let $=new Y1;$.setAnimationLoop(B),this.setAnimationLoop=function(G){E=G},this.dispose=function(){}}};function PT(n){function e(x,h){x.fogColor.value.copy(h.color),h.isFog?(x.fogNear.value=h.near,x.fogFar.value=h.far):h.isFogExp2&&(x.fogDensity.value=h.density)}function t(x,h,y,_){h.isMeshBasicMaterial?a(x,h):h.isMeshLambertMaterial?(a(x,h),u(x,h)):h.isMeshToonMaterial?(a(x,h),f(x,h)):h.isMeshPhongMaterial?(a(x,h),d(x,h)):h.isMeshStandardMaterial?(a(x,h),h.isMeshPhysicalMaterial?c(x,h):p(x,h)):h.isMeshMatcapMaterial?(a(x,h),m(x,h)):h.isMeshDepthMaterial?(a(x,h),g(x,h)):h.isMeshDistanceMaterial?(a(x,h),v(x,h)):h.isMeshNormalMaterial?(a(x,h),w(x,h)):h.isLineBasicMaterial?(r(x,h),h.isLineDashedMaterial&&i(x,h)):h.isPointsMaterial?s(x,h,y,_):h.isSpriteMaterial?l(x,h):h.isShadowMaterial?(x.color.value.copy(h.color),x.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function a(x,h){x.opacity.value=h.opacity,h.color&&x.diffuse.value.copy(h.color),h.emissive&&x.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(x.map.value=h.map),h.alphaMap&&(x.alphaMap.value=h.alphaMap),h.specularMap&&(x.specularMap.value=h.specularMap);let y=n.get(h).envMap;if(y){x.envMap.value=y,x.flipEnvMap.value=y.isCubeTexture&&y._needsFlipEnvMap?-1:1,x.reflectivity.value=h.reflectivity,x.refractionRatio.value=h.refractionRatio;let M=n.get(y).__maxMipLevel;M!==void 0&&(x.maxMipLevel.value=M)}h.lightMap&&(x.lightMap.value=h.lightMap,x.lightMapIntensity.value=h.lightMapIntensity),h.aoMap&&(x.aoMap.value=h.aoMap,x.aoMapIntensity.value=h.aoMapIntensity);let _;h.map?_=h.map:h.specularMap?_=h.specularMap:h.displacementMap?_=h.displacementMap:h.normalMap?_=h.normalMap:h.bumpMap?_=h.bumpMap:h.roughnessMap?_=h.roughnessMap:h.metalnessMap?_=h.metalnessMap:h.alphaMap?_=h.alphaMap:h.emissiveMap?_=h.emissiveMap:h.clearcoatMap?_=h.clearcoatMap:h.clearcoatNormalMap?_=h.clearcoatNormalMap:h.clearcoatRoughnessMap&&(_=h.clearcoatRoughnessMap),_!==void 0&&(_.isWebGLRenderTarget&&(_=_.texture),_.matrixAutoUpdate===!0&&_.updateMatrix(),x.uvTransform.value.copy(_.matrix));let b;h.aoMap?b=h.aoMap:h.lightMap&&(b=h.lightMap),b!==void 0&&(b.isWebGLRenderTarget&&(b=b.texture),b.matrixAutoUpdate===!0&&b.updateMatrix(),x.uv2Transform.value.copy(b.matrix))}function r(x,h){x.diffuse.value.copy(h.color),x.opacity.value=h.opacity}function i(x,h){x.dashSize.value=h.dashSize,x.totalSize.value=h.dashSize+h.gapSize,x.scale.value=h.scale}function s(x,h,y,_){x.diffuse.value.copy(h.color),x.opacity.value=h.opacity,x.size.value=h.size*y,x.scale.value=_*.5,h.map&&(x.map.value=h.map),h.alphaMap&&(x.alphaMap.value=h.alphaMap);let b;h.map?b=h.map:h.alphaMap&&(b=h.alphaMap),b!==void 0&&(b.matrixAutoUpdate===!0&&b.updateMatrix(),x.uvTransform.value.copy(b.matrix))}function l(x,h){x.diffuse.value.copy(h.color),x.opacity.value=h.opacity,x.rotation.value=h.rotation,h.map&&(x.map.value=h.map),h.alphaMap&&(x.alphaMap.value=h.alphaMap);let y;h.map?y=h.map:h.alphaMap&&(y=h.alphaMap),y!==void 0&&(y.matrixAutoUpdate===!0&&y.updateMatrix(),x.uvTransform.value.copy(y.matrix))}function u(x,h){h.emissiveMap&&(x.emissiveMap.value=h.emissiveMap)}function d(x,h){x.specular.value.copy(h.specular),x.shininess.value=Math.max(h.shininess,1e-4),h.emissiveMap&&(x.emissiveMap.value=h.emissiveMap),h.bumpMap&&(x.bumpMap.value=h.bumpMap,x.bumpScale.value=h.bumpScale,h.side===Dt&&(x.bumpScale.value*=-1)),h.normalMap&&(x.normalMap.value=h.normalMap,x.normalScale.value.copy(h.normalScale),h.side===Dt&&x.normalScale.value.negate()),h.displacementMap&&(x.displacementMap.value=h.displacementMap,x.displacementScale.value=h.displacementScale,x.displacementBias.value=h.displacementBias)}function f(x,h){h.gradientMap&&(x.gradientMap.value=h.gradientMap),h.emissiveMap&&(x.emissiveMap.value=h.emissiveMap),h.bumpMap&&(x.bumpMap.value=h.bumpMap,x.bumpScale.value=h.bumpScale,h.side===Dt&&(x.bumpScale.value*=-1)),h.normalMap&&(x.normalMap.value=h.normalMap,x.normalScale.value.copy(h.normalScale),h.side===Dt&&x.normalScale.value.negate()),h.displacementMap&&(x.displacementMap.value=h.displacementMap,x.displacementScale.value=h.displacementScale,x.displacementBias.value=h.displacementBias)}function p(x,h){x.roughness.value=h.roughness,x.metalness.value=h.metalness,h.roughnessMap&&(x.roughnessMap.value=h.roughnessMap),h.metalnessMap&&(x.metalnessMap.value=h.metalnessMap),h.emissiveMap&&(x.emissiveMap.value=h.emissiveMap),h.bumpMap&&(x.bumpMap.value=h.bumpMap,x.bumpScale.value=h.bumpScale,h.side===Dt&&(x.bumpScale.value*=-1)),h.normalMap&&(x.normalMap.value=h.normalMap,x.normalScale.value.copy(h.normalScale),h.side===Dt&&x.normalScale.value.negate()),h.displacementMap&&(x.displacementMap.value=h.displacementMap,x.displacementScale.value=h.displacementScale,x.displacementBias.value=h.displacementBias),n.get(h).envMap&&(x.envMapIntensity.value=h.envMapIntensity)}function c(x,h){p(x,h),x.reflectivity.value=h.reflectivity,x.clearcoat.value=h.clearcoat,x.clearcoatRoughness.value=h.clearcoatRoughness,h.sheen&&x.sheen.value.copy(h.sheen),h.clearcoatMap&&(x.clearcoatMap.value=h.clearcoatMap),h.clearcoatRoughnessMap&&(x.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap),h.clearcoatNormalMap&&(x.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),x.clearcoatNormalMap.value=h.clearcoatNormalMap,h.side===Dt&&x.clearcoatNormalScale.value.negate()),x.transmission.value=h.transmission,h.transmissionMap&&(x.transmissionMap.value=h.transmissionMap)}function m(x,h){h.matcap&&(x.matcap.value=h.matcap),h.bumpMap&&(x.bumpMap.value=h.bumpMap,x.bumpScale.value=h.bumpScale,h.side===Dt&&(x.bumpScale.value*=-1)),h.normalMap&&(x.normalMap.value=h.normalMap,x.normalScale.value.copy(h.normalScale),h.side===Dt&&x.normalScale.value.negate()),h.displacementMap&&(x.displacementMap.value=h.displacementMap,x.displacementScale.value=h.displacementScale,x.displacementBias.value=h.displacementBias)}function g(x,h){h.displacementMap&&(x.displacementMap.value=h.displacementMap,x.displacementScale.value=h.displacementScale,x.displacementBias.value=h.displacementBias)}function v(x,h){h.displacementMap&&(x.displacementMap.value=h.displacementMap,x.displacementScale.value=h.displacementScale,x.displacementBias.value=h.displacementBias),x.referencePosition.value.copy(h.referencePosition),x.nearDistance.value=h.nearDistance,x.farDistance.value=h.farDistance}function w(x,h){h.bumpMap&&(x.bumpMap.value=h.bumpMap,x.bumpScale.value=h.bumpScale,h.side===Dt&&(x.bumpScale.value*=-1)),h.normalMap&&(x.normalMap.value=h.normalMap,x.normalScale.value.copy(h.normalScale),h.side===Dt&&x.normalScale.value.negate()),h.displacementMap&&(x.displacementMap.value=h.displacementMap,x.displacementScale.value=h.displacementScale,x.displacementBias.value=h.displacementBias)}return{refreshFogUniforms:e,refreshMaterialUniforms:t}}function DT(){let n=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");return n.style.display="block",n}function Qe(n){n=n||{};let e=n.canvas!==void 0?n.canvas:DT(),t=n.context!==void 0?n.context:null,a=n.alpha!==void 0?n.alpha:!1,r=n.depth!==void 0?n.depth:!0,i=n.stencil!==void 0?n.stencil:!0,s=n.antialias!==void 0?n.antialias:!1,l=n.premultipliedAlpha!==void 0?n.premultipliedAlpha:!0,u=n.preserveDrawingBuffer!==void 0?n.preserveDrawingBuffer:!1,d=n.powerPreference!==void 0?n.powerPreference:"default",f=n.failIfMajorPerformanceCaveat!==void 0?n.failIfMajorPerformanceCaveat:!1,p=null,c=null,m=[],g=[];this.domElement=e,this.debug={checkShaderErrors:!0},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.gammaFactor=2,this.outputEncoding=Sn,this.physicallyCorrectLights=!1,this.toneMapping=Ws,this.toneMappingExposure=1;let v=this,w=!1,x=0,h=0,y=null,_=-1,b=null,M=new Ye,S=new Ye,k=null,E=e.width,B=e.height,$=1,G=null,A=null,O=new Ye(0,0,E,B),N=new Ye(0,0,E,B),C=!1,W=new Ys,X=!1,R=!1,K=new Fe,ne=new D,Y={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function J(){return y===null?$:1}let z=t;function q(P,Z){for(let I=0;I<P.length;I++){let F=P[I],V=e.getContext(F,Z);if(V!==null)return V}return null}try{let P={alpha:a,depth:r,stencil:i,antialias:s,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:d,failIfMajorPerformanceCaveat:f};if(e.addEventListener("webglcontextlost",Oe,!1),e.addEventListener("webglcontextrestored",$e,!1),z===null){let Z=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&Z.shift(),z=q(Z,P),z===null)throw q(Z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}z.getShaderPrecisionFormat===void 0&&(z.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let de,ge,ye,Ne,ce,ze,re,se,fe,he,H,L,T,j,Q,pe,we,Re,Pe,U,me,ve;function Ee(){de=new aI(z),ge=new eI(z,de,n),de.init(ge),me=new kT(z,de,ge),ye=new TT(z,de,ge),Ne=new sI(z),ce=new xT,ze=new AT(z,de,ye,ce,ge,me,Ne),re=new nI(v),se=new TL(z,ge),ve=new QE(z,de,se,ge),fe=new rI(z,se,Ne,ve),he=new dI(z,fe,se,Ne),Re=new uI(z),Q=new tI(ce),H=new gT(v,re,de,ge,ve,Q),L=new PT(ce),T=new bT(ce),j=new CT(de,ge),we=new JE(v,re,ye,he,l),pe=new aw(v,he,ge),Pe=new KE(z,de,Ne,ge),U=new iI(z,de,Ne,ge),Ne.programs=H.programs,v.capabilities=ge,v.extensions=de,v.properties=ce,v.renderLists=T,v.shadowMap=pe,v.state=ye,v.info=Ne}Ee();let ae=new Xm(v,z);this.xr=ae,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let P=de.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){let P=de.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(P){P!==void 0&&($=P,this.setSize(E,B,!1))},this.getSize=function(P){return P===void 0&&(console.warn("WebGLRenderer: .getsize() now requires a Vector2 as an argument"),P=new le),P.set(E,B)},this.setSize=function(P,Z,I){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}E=P,B=Z,e.width=Math.floor(P*$),e.height=Math.floor(Z*$),I!==!1&&(e.style.width=P+"px",e.style.height=Z+"px"),this.setViewport(0,0,P,Z)},this.getDrawingBufferSize=function(P){return P===void 0&&(console.warn("WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument"),P=new le),P.set(E*$,B*$).floor()},this.setDrawingBufferSize=function(P,Z,I){E=P,B=Z,$=I,e.width=Math.floor(P*I),e.height=Math.floor(Z*I),this.setViewport(0,0,P,Z)},this.getCurrentViewport=function(P){return P===void 0&&(console.warn("WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument"),P=new Ye),P.copy(M)},this.getViewport=function(P){return P.copy(O)},this.setViewport=function(P,Z,I,F){P.isVector4?O.set(P.x,P.y,P.z,P.w):O.set(P,Z,I,F),ye.viewport(M.copy(O).multiplyScalar($).floor())},this.getScissor=function(P){return P.copy(N)},this.setScissor=function(P,Z,I,F){P.isVector4?N.set(P.x,P.y,P.z,P.w):N.set(P,Z,I,F),ye.scissor(S.copy(N).multiplyScalar($).floor())},this.getScissorTest=function(){return C},this.setScissorTest=function(P){ye.setScissorTest(C=P)},this.setOpaqueSort=function(P){G=P},this.setTransparentSort=function(P){A=P},this.getClearColor=function(P){return P===void 0&&(console.warn("WebGLRenderer: .getClearColor() now requires a Color as an argument"),P=new Ce),P.copy(we.getClearColor())},this.setClearColor=function(){we.setClearColor.apply(we,arguments)},this.getClearAlpha=function(){return we.getClearAlpha()},this.setClearAlpha=function(){we.setClearAlpha.apply(we,arguments)},this.clear=function(P,Z,I){let F=0;(P===void 0||P)&&(F|=16384),(Z===void 0||Z)&&(F|=256),(I===void 0||I)&&(F|=1024),z.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Oe,!1),e.removeEventListener("webglcontextrestored",$e,!1),T.dispose(),j.dispose(),ce.dispose(),re.dispose(),he.dispose(),ve.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",ut),ae.removeEventListener("sessionend",qt),ma.stop()};function Oe(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function $e(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;let P=Ne.autoReset,Z=pe.enabled,I=pe.autoUpdate,F=pe.needsUpdate,V=pe.type;Ee(),Ne.autoReset=P,pe.enabled=Z,pe.autoUpdate=I,pe.needsUpdate=F,pe.type=V}function st(P){let Z=P.target;Z.removeEventListener("dispose",st),hn(Z)}function hn(P){tt(P),ce.remove(P)}function tt(P){let Z=ce.get(P).programs;Z!==void 0&&Z.forEach(function(I){H.releaseProgram(I)})}function ke(P,Z){P.render(function(I){v.renderBufferImmediate(I,Z)})}this.renderBufferImmediate=function(P,Z){ve.initAttributes();let I=ce.get(P);P.hasPositions&&!I.position&&(I.position=z.createBuffer()),P.hasNormals&&!I.normal&&(I.normal=z.createBuffer()),P.hasUvs&&!I.uv&&(I.uv=z.createBuffer()),P.hasColors&&!I.color&&(I.color=z.createBuffer());let F=Z.getAttributes();P.hasPositions&&(z.bindBuffer(34962,I.position),z.bufferData(34962,P.positionArray,35048),ve.enableAttribute(F.position),z.vertexAttribPointer(F.position,3,5126,!1,0,0)),P.hasNormals&&(z.bindBuffer(34962,I.normal),z.bufferData(34962,P.normalArray,35048),ve.enableAttribute(F.normal),z.vertexAttribPointer(F.normal,3,5126,!1,0,0)),P.hasUvs&&(z.bindBuffer(34962,I.uv),z.bufferData(34962,P.uvArray,35048),ve.enableAttribute(F.uv),z.vertexAttribPointer(F.uv,2,5126,!1,0,0)),P.hasColors&&(z.bindBuffer(34962,I.color),z.bufferData(34962,P.colorArray,35048),ve.enableAttribute(F.color),z.vertexAttribPointer(F.color,3,5126,!1,0,0)),ve.disableUnusedAttributes(),z.drawArrays(4,0,P.count),P.count=0},this.renderBufferDirect=function(P,Z,I,F,V,ee){Z===null&&(Z=Y);let te=V.isMesh&&V.matrixWorld.determinant()<0,ue=Ct(P,Z,F,V);ye.setMaterial(F,te);let De=I.index,Te=I.attributes.position;if(De===null){if(Te===void 0||Te.count===0)return}else if(De.count===0)return;let He=1;F.wireframe===!0&&(De=fe.getWireframeAttribute(I),He=2),(F.morphTargets||F.morphNormals)&&Re.update(V,I,F,ue),ve.setup(V,F,ue,I,De);let Ae,Ze=Pe;De!==null&&(Ae=se.get(De),Ze=U,Ze.setIndex(Ae));let ga=De!==null?De.count:Te.count,tn=I.drawRange.start*He,li=I.drawRange.count*He,Et=ee!==null?ee.start*He:0,ui=ee!==null?ee.count*He:1/0,Mt=Math.max(tn,Et),zf=Math.min(ga,tn+li,Et+ui)-1,mn=Math.max(0,zf-Mt+1);if(mn!==0){if(V.isMesh)F.wireframe===!0?(ye.setLineWidth(F.wireframeLinewidth*J()),Ze.setMode(1)):Ze.setMode(4);else if(V.isLine){let Oa=F.linewidth;Oa===void 0&&(Oa=1),ye.setLineWidth(Oa*J()),V.isLineSegments?Ze.setMode(1):V.isLineLoop?Ze.setMode(2):Ze.setMode(3)}else V.isPoints?Ze.setMode(0):V.isSprite&&Ze.setMode(4);if(V.isInstancedMesh)Ze.renderInstances(Mt,mn,V.count);else if(I.isInstancedBufferGeometry){let Oa=Math.min(I.instanceCount,I._maxInstanceCount);Ze.renderInstances(Mt,mn,Oa)}else Ze.render(Mt,mn)}},this.compile=function(P,Z){c=j.get(P),c.init(),P.traverseVisible(function(I){I.isLight&&I.layers.test(Z.layers)&&(c.pushLight(I),I.castShadow&&c.pushShadow(I))}),c.setupLights(),P.traverse(function(I){let F=I.material;if(F)if(Array.isArray(F))for(let V=0;V<F.length;V++){let ee=F[V];Mo(ee,P,I)}else Mo(F,P,I)})};let Ie=null;function Lt(P){Ie&&Ie(P)}function ut(){ma.stop()}function qt(){ma.start()}let ma=new Y1;ma.setAnimationLoop(Lt),typeof window<"u"&&ma.setContext(window),this.setAnimationLoop=function(P){Ie=P,ae.setAnimationLoop(P),P===null?ma.stop():ma.start()},ae.addEventListener("sessionstart",ut),ae.addEventListener("sessionend",qt),this.render=function(P,Z){let I,F;if(arguments[2]!==void 0&&(console.warn("THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead."),I=arguments[2]),arguments[3]!==void 0&&(console.warn("THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead."),F=arguments[3]),Z!==void 0&&Z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;P.autoUpdate===!0&&P.updateMatrixWorld(),Z.parent===null&&Z.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(Z=ae.getCamera(Z)),P.isScene===!0&&P.onBeforeRender(v,P,Z,I||y),c=j.get(P,g.length),c.init(),g.push(c),K.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),W.setFromProjectionMatrix(K),R=this.localClippingEnabled,X=Q.init(this.clippingPlanes,R,Z),p=T.get(P,m.length),p.init(),m.push(p),wo(P,Z,0,v.sortObjects),p.finish(),v.sortObjects===!0&&p.sort(G,A),X===!0&&Q.beginShadows();let V=c.state.shadowsArray;pe.render(V,P,Z),c.setupLights(),c.setupLightsView(Z),X===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset(),I!==void 0&&this.setRenderTarget(I),we.render(p,P,Z,F);let ee=p.opaque,te=p.transparent;ee.length>0&&Su(ee,P,Z),te.length>0&&Su(te,P,Z),y!==null&&(ze.updateRenderTargetMipmap(y),ze.updateMultisampleRenderTarget(y)),P.isScene===!0&&P.onAfterRender(v,P,Z),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1),ve.resetDefaultState(),_=-1,b=null,g.pop(),g.length>0?c=g[g.length-1]:c=null,m.pop(),m.length>0?p=m[m.length-1]:p=null};function wo(P,Z,I,F){if(P.visible===!1)return;if(P.layers.test(Z.layers)){if(P.isGroup)I=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(Z);else if(P.isLight)c.pushLight(P),P.castShadow&&c.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||W.intersectsSprite(P)){F&&ne.setFromMatrixPosition(P.matrixWorld).applyMatrix4(K);let te=he.update(P),ue=P.material;ue.visible&&p.push(P,te,ue,I,ne.z,null)}}else if(P.isImmediateRenderObject)F&&ne.setFromMatrixPosition(P.matrixWorld).applyMatrix4(K),p.push(P,null,P.material,I,ne.z,null);else if((P.isMesh||P.isLine||P.isPoints)&&(P.isSkinnedMesh&&P.skeleton.frame!==Ne.render.frame&&(P.skeleton.update(),P.skeleton.frame=Ne.render.frame),!P.frustumCulled||W.intersectsObject(P))){F&&ne.setFromMatrixPosition(P.matrixWorld).applyMatrix4(K);let te=he.update(P),ue=P.material;if(Array.isArray(ue)){let De=te.groups;for(let Te=0,He=De.length;Te<He;Te++){let Ae=De[Te],Ze=ue[Ae.materialIndex];Ze&&Ze.visible&&p.push(P,te,Ze,I,ne.z,Ae)}}else ue.visible&&p.push(P,te,ue,I,ne.z,null)}}let ee=P.children;for(let te=0,ue=ee.length;te<ue;te++)wo(ee[te],Z,I,F)}function Su(P,Z,I){let F=Z.isScene===!0?Z.overrideMaterial:null;for(let V=0,ee=P.length;V<ee;V++){let te=P[V],ue=te.object,De=te.geometry,Te=F===null?te.material:F,He=te.group;if(I.isArrayCamera){let Ae=I.cameras;for(let Ze=0,ga=Ae.length;Ze<ga;Ze++){let tn=Ae[Ze];ue.layers.test(tn.layers)&&(ye.viewport(M.copy(tn.viewport)),c.setupLightsView(tn),So(ue,Z,tn,De,Te,He))}}else So(ue,Z,I,De,Te,He)}}function So(P,Z,I,F,V,ee){if(P.onBeforeRender(v,Z,I,F,V,ee),P.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),P.isImmediateRenderObject){let te=Ct(I,Z,V,P);ye.setMaterial(V),ve.reset(),ke(P,te)}else v.renderBufferDirect(I,Z,F,V,P,ee);P.onAfterRender(v,Z,I,F,V,ee)}function Mo(P,Z,I){Z.isScene!==!0&&(Z=Y);let F=ce.get(P),V=c.state.lights,ee=c.state.shadowsArray,te=V.state.version,ue=H.getParameters(P,V.state,ee,Z,I),De=H.getProgramCacheKey(ue),Te=F.programs;F.environment=P.isMeshStandardMaterial?Z.environment:null,F.fog=Z.fog,F.envMap=re.get(P.envMap||F.environment),Te===void 0&&(P.addEventListener("dispose",st),Te=new Map,F.programs=Te);let He=Te.get(De);if(He!==void 0){if(F.currentProgram===He&&F.lightsStateVersion===te)return Mu(P,ue),He}else ue.uniforms=H.getUniforms(P),P.onBuild(ue,v),P.onBeforeCompile(ue,v),He=H.acquireProgram(ue,De),Te.set(De,He),F.uniforms=ue.uniforms;let Ae=F.uniforms;(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Ae.clippingPlanes=Q.uniform),Mu(P,ue),F.needsLights=_u(P),F.lightsStateVersion=te,F.needsLights&&(Ae.ambientLightColor.value=V.state.ambient,Ae.lightProbe.value=V.state.probe,Ae.directionalLights.value=V.state.directional,Ae.directionalLightShadows.value=V.state.directionalShadow,Ae.spotLights.value=V.state.spot,Ae.spotLightShadows.value=V.state.spotShadow,Ae.rectAreaLights.value=V.state.rectArea,Ae.ltc_1.value=V.state.rectAreaLTC1,Ae.ltc_2.value=V.state.rectAreaLTC2,Ae.pointLights.value=V.state.point,Ae.pointLightShadows.value=V.state.pointShadow,Ae.hemisphereLights.value=V.state.hemi,Ae.directionalShadowMap.value=V.state.directionalShadowMap,Ae.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Ae.spotShadowMap.value=V.state.spotShadowMap,Ae.spotShadowMatrix.value=V.state.spotShadowMatrix,Ae.pointShadowMap.value=V.state.pointShadowMap,Ae.pointShadowMatrix.value=V.state.pointShadowMatrix);let Ze=He.getUniforms(),ga=Rr.seqWithValue(Ze.seq,Ae);return F.currentProgram=He,F.uniformsList=ga,He}function Mu(P,Z){let I=ce.get(P);I.outputEncoding=Z.outputEncoding,I.instancing=Z.instancing,I.numClippingPlanes=Z.numClippingPlanes,I.numIntersection=Z.numClipIntersection,I.vertexAlphas=Z.vertexAlphas}function Ct(P,Z,I,F){Z.isScene!==!0&&(Z=Y),ze.resetTextureUnits();let V=Z.fog,ee=I.isMeshStandardMaterial?Z.environment:null,te=y===null?v.outputEncoding:y.texture.encoding,ue=re.get(I.envMap||ee),De=I.vertexColors===!0&&F.geometry&&F.geometry.attributes.color&&F.geometry.attributes.color.itemSize===4,Te=ce.get(I),He=c.state.lights;if(X===!0&&(R===!0||P!==b)){let Mt=P===b&&I.id===_;Q.setState(I,P,Mt)}let Ae=!1;I.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==He.state.version||Te.outputEncoding!==te||F.isInstancedMesh&&Te.instancing===!1||!F.isInstancedMesh&&Te.instancing===!0||Te.envMap!==ue||I.fog&&Te.fog!==V||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==Q.numPlanes||Te.numIntersection!==Q.numIntersection)||Te.vertexAlphas!==De)&&(Ae=!0):(Ae=!0,Te.__version=I.version);let Ze=Te.currentProgram;Ae===!0&&(Ze=Mo(I,Z,F));let ga=!1,tn=!1,li=!1,Et=Ze.getUniforms(),ui=Te.uniforms;if(ye.useProgram(Ze.program)&&(ga=!0,tn=!0,li=!0),I.id!==_&&(_=I.id,tn=!0),ga||b!==P){if(Et.setValue(z,"projectionMatrix",P.projectionMatrix),ge.logarithmicDepthBuffer&&Et.setValue(z,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),b!==P&&(b=P,tn=!0,li=!0),I.isShaderMaterial||I.isMeshPhongMaterial||I.isMeshToonMaterial||I.isMeshStandardMaterial||I.envMap){let Mt=Et.map.cameraPosition;Mt!==void 0&&Mt.setValue(z,ne.setFromMatrixPosition(P.matrixWorld))}(I.isMeshPhongMaterial||I.isMeshToonMaterial||I.isMeshLambertMaterial||I.isMeshBasicMaterial||I.isMeshStandardMaterial||I.isShaderMaterial)&&Et.setValue(z,"isOrthographic",P.isOrthographicCamera===!0),(I.isMeshPhongMaterial||I.isMeshToonMaterial||I.isMeshLambertMaterial||I.isMeshBasicMaterial||I.isMeshStandardMaterial||I.isShaderMaterial||I.isShadowMaterial||I.skinning)&&Et.setValue(z,"viewMatrix",P.matrixWorldInverse)}if(I.skinning){Et.setOptional(z,F,"bindMatrix"),Et.setOptional(z,F,"bindMatrixInverse");let Mt=F.skeleton;if(Mt){let zf=Mt.bones;if(ge.floatVertexTextures){if(Mt.boneTexture===null){let mn=Math.sqrt(zf.length*4);mn=cL(mn),mn=Math.max(mn,4);let Oa=new Float32Array(mn*mn*4);Oa.set(Mt.boneMatrices);let dS=new Bc(Oa,mn,mn,qn,Hr);Mt.boneMatrices=Oa,Mt.boneTexture=dS,Mt.boneTextureSize=mn}Et.setValue(z,"boneTexture",Mt.boneTexture,ze),Et.setValue(z,"boneTextureSize",Mt.boneTextureSize)}else Et.setOptional(z,Mt,"boneMatrices")}}return(tn||Te.receiveShadow!==F.receiveShadow)&&(Te.receiveShadow=F.receiveShadow,Et.setValue(z,"receiveShadow",F.receiveShadow)),tn&&(Et.setValue(z,"toneMappingExposure",v.toneMappingExposure),Te.needsLights&&Vi(ui,li),V&&I.fog&&L.refreshFogUniforms(ui,V),L.refreshMaterialUniforms(ui,I,$,B),Rr.upload(z,Te.uniformsList,ui,ze)),I.isShaderMaterial&&I.uniformsNeedUpdate===!0&&(Rr.upload(z,Te.uniformsList,ui,ze),I.uniformsNeedUpdate=!1),I.isSpriteMaterial&&Et.setValue(z,"center",F.center),Et.setValue(z,"modelViewMatrix",F.modelViewMatrix),Et.setValue(z,"normalMatrix",F.normalMatrix),Et.setValue(z,"modelMatrix",F.matrixWorld),Ze}function Vi(P,Z){P.ambientLightColor.needsUpdate=Z,P.lightProbe.needsUpdate=Z,P.directionalLights.needsUpdate=Z,P.directionalLightShadows.needsUpdate=Z,P.pointLights.needsUpdate=Z,P.pointLightShadows.needsUpdate=Z,P.spotLights.needsUpdate=Z,P.spotLightShadows.needsUpdate=Z,P.rectAreaLights.needsUpdate=Z,P.hemisphereLights.needsUpdate=Z}function _u(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return x},this.getActiveMipmapLevel=function(){return h},this.getRenderTarget=function(){return y},this.setRenderTarget=function(P,Z=0,I=0){y=P,x=Z,h=I,P&&ce.get(P).__webglFramebuffer===void 0&&ze.setupRenderTarget(P);let F=null,V=!1,ee=!1;if(P){let te=P.texture;(te.isDataTexture3D||te.isDataTexture2DArray)&&(ee=!0);let ue=ce.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(F=ue[Z],V=!0):P.isWebGLMultisampleRenderTarget?F=ce.get(P).__webglMultisampledFramebuffer:F=ue,M.copy(P.viewport),S.copy(P.scissor),k=P.scissorTest}else M.copy(O).multiplyScalar($).floor(),S.copy(N).multiplyScalar($).floor(),k=C;if(ye.bindFramebuffer(36160,F),ye.viewport(M),ye.scissor(S),ye.setScissorTest(k),V){let te=ce.get(P.texture);z.framebufferTexture2D(36160,36064,34069+Z,te.__webglTexture,I)}else if(ee){let te=ce.get(P.texture),ue=Z||0;z.framebufferTextureLayer(36160,36064,te.__webglTexture,I||0,ue)}},this.readRenderTargetPixels=function(P,Z,I,F,V,ee,te){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=ce.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&te!==void 0&&(ue=ue[te]),ue){ye.bindFramebuffer(36160,ue);try{let De=P.texture,Te=De.format,He=De.type;if(Te!==qn&&me.convert(Te)!==z.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Ae=He===Ic&&(de.has("EXT_color_buffer_half_float")||ge.isWebGL2&&de.has("EXT_color_buffer_float"));if(He!==tu&&me.convert(He)!==z.getParameter(35738)&&!(He===Hr&&(ge.isWebGL2||de.has("OES_texture_float")||de.has("WEBGL_color_buffer_float")))&&!Ae){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z.checkFramebufferStatus(36160)===36053?Z>=0&&Z<=P.width-F&&I>=0&&I<=P.height-V&&z.readPixels(Z,I,F,V,me.convert(Te),me.convert(He),ee):console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")}finally{let De=y!==null?ce.get(y).__webglFramebuffer:null;ye.bindFramebuffer(36160,De)}}},this.copyFramebufferToTexture=function(P,Z,I=0){let F=Math.pow(2,-I),V=Math.floor(Z.image.width*F),ee=Math.floor(Z.image.height*F),te=me.convert(Z.format);ze.setTexture2D(Z,0),z.copyTexImage2D(3553,I,te,P.x,P.y,V,ee,0),ye.unbindTexture()},this.copyTextureToTexture=function(P,Z,I,F=0){let V=Z.image.width,ee=Z.image.height,te=me.convert(I.format),ue=me.convert(I.type);ze.setTexture2D(I,0),z.pixelStorei(37440,I.flipY),z.pixelStorei(37441,I.premultiplyAlpha),z.pixelStorei(3317,I.unpackAlignment),Z.isDataTexture?z.texSubImage2D(3553,F,P.x,P.y,V,ee,te,ue,Z.image.data):Z.isCompressedTexture?z.compressedTexSubImage2D(3553,F,P.x,P.y,Z.mipmaps[0].width,Z.mipmaps[0].height,te,Z.mipmaps[0].data):z.texSubImage2D(3553,F,P.x,P.y,te,ue,Z.image),F===0&&I.generateMipmaps&&z.generateMipmap(3553),ye.unbindTexture()},this.copyTextureToTexture3D=function(P,Z,I,F,V=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let{width:ee,height:te,data:ue}=I.image,De=me.convert(F.format),Te=me.convert(F.type),He;if(F.isDataTexture3D)ze.setTexture3D(F,0),He=32879;else if(F.isDataTexture2DArray)ze.setTexture2DArray(F,0),He=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}z.pixelStorei(37440,F.flipY),z.pixelStorei(37441,F.premultiplyAlpha),z.pixelStorei(3317,F.unpackAlignment);let Ae=z.getParameter(3314),Ze=z.getParameter(32878),ga=z.getParameter(3316),tn=z.getParameter(3315),li=z.getParameter(32877);z.pixelStorei(3314,ee),z.pixelStorei(32878,te),z.pixelStorei(3316,P.min.x),z.pixelStorei(3315,P.min.y),z.pixelStorei(32877,P.min.z),z.texSubImage3D(He,V,Z.x,Z.y,Z.z,P.max.x-P.min.x+1,P.max.y-P.min.y+1,P.max.z-P.min.z+1,De,Te,ue),z.pixelStorei(3314,Ae),z.pixelStorei(32878,Ze),z.pixelStorei(3316,ga),z.pixelStorei(3315,tn),z.pixelStorei(32877,li),V===0&&F.generateMipmaps&&z.generateMipmap(He),ye.unbindTexture()},this.initTexture=function(P){ze.setTexture2D(P,0),ye.unbindTexture()},this.resetState=function(){x=0,h=0,y=null,ye.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}var Ym=class extends Qe{};Ym.prototype.isWebGL1Renderer=!0;var Zm=class n{constructor(e,t=25e-5){this.name="",this.color=new Ce(e),this.density=t}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",color:this.color.getHex(),density:this.density}}};Zm.prototype.isFogExp2=!0;var Hl=class n{constructor(e,t=1,a=1e3){this.name="",this.color=new Ce(e),this.near=t,this.far=a}clone(){return new n(this.color,this.near,this.far)}toJSON(){return{type:"Fog",color:this.color.getHex(),near:this.near,far:this.far}}};Hl.prototype.isFog=!0;var Zs=class extends Xe{constructor(){super(),this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.autoUpdate=e.autoUpdate,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.background!==null&&(t.object.background=this.background.toJSON(e)),this.environment!==null&&(t.object.environment=this.environment.toJSON(e)),this.fog!==null&&(t.object.fog=this.fog.toJSON()),t}};Zs.prototype.isScene=!0;var Ni=class n{constructor(e,t){this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Bl,this.updateRange={offset:0,count:-1},this.version=0,this.uuid=ca(),this.onUploadCallback=function(){}}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,a){e*=this.stride,a*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[a+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ca()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),a=new n(t,this.stride);return a.setUsage(this.usage),a}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ca()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.prototype.slice.call(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}};Ni.prototype.isInterleavedBuffer=!0;var St=new D,Ul=class n{constructor(e,t,a,r){this.name="",this.data=e,this.itemSize=t,this.offset=a,this.normalized=r===!0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,a=this.data.count;t<a;t++)St.x=this.getX(t),St.y=this.getY(t),St.z=this.getZ(t),St.applyMatrix4(e),this.setXYZ(t,St.x,St.y,St.z);return this}applyNormalMatrix(e){for(let t=0,a=this.count;t<a;t++)St.x=this.getX(t),St.y=this.getY(t),St.z=this.getZ(t),St.applyNormalMatrix(e),this.setXYZ(t,St.x,St.y,St.z);return this}transformDirection(e){for(let t=0,a=this.count;t<a;t++)St.x=this.getX(t),St.y=this.getY(t),St.z=this.getZ(t),St.transformDirection(e),this.setXYZ(t,St.x,St.y,St.z);return this}setX(e,t){return this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){return this.data.array[e*this.data.stride+this.offset]}getY(e){return this.data.array[e*this.data.stride+this.offset+1]}getZ(e){return this.data.array[e*this.data.stride+this.offset+2]}getW(e){return this.data.array[e*this.data.stride+this.offset+3]}setXY(e,t,a){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=a,this}setXYZ(e,t,a,r){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=a,this.data.array[e+2]=r,this}setXYZW(e,t,a,r,i){return e=e*this.data.stride+this.offset,this.data.array[e+0]=t,this.data.array[e+1]=a,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interlaved buffer attribute will deinterleave buffer data.");let t=[];for(let a=0;a<this.count;a++){let r=a*this.data.stride+this.offset;for(let i=0;i<this.itemSize;i++)t.push(this.data.array[r+i])}return new vt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interlaved buffer attribute will deinterleave buffer data.");let t=[];for(let a=0;a<this.count;a++){let r=a*this.data.stride+this.offset;for(let i=0;i<this.itemSize;i++)t.push(this.data.array[r+i])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};Ul.prototype.isInterleavedBufferAttribute=!0;var Gc=class extends Bt{constructor(e){super(),this.type="SpriteMaterial",this.color=new Ce(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this}};Gc.prototype.isSpriteMaterial=!0;var Ds,Sl=new D,Fs=new D,Bs=new D,zs=new le,Ml=new le,rw=new Fe,dc=new D,_l=new D,cc=new D,i1=new le,km=new le,s1=new le,Jm=class extends Xe{constructor(e){if(super(),this.type="Sprite",Ds===void 0){Ds=new et;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),a=new Ni(t,5);Ds.setIndex([0,1,2,0,2,3]),Ds.setAttribute("position",new Ul(a,3,0,!1)),Ds.setAttribute("uv",new Ul(a,2,3,!1))}this.geometry=Ds,this.material=e!==void 0?e:new Gc,this.center=new le(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Fs.setFromMatrixScale(this.matrixWorld),rw.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Bs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Fs.multiplyScalar(-Bs.z);let a=this.material.rotation,r,i;a!==0&&(i=Math.cos(a),r=Math.sin(a));let s=this.center;fc(dc.set(-.5,-.5,0),Bs,s,Fs,r,i),fc(_l.set(.5,-.5,0),Bs,s,Fs,r,i),fc(cc.set(.5,.5,0),Bs,s,Fs,r,i),i1.set(0,0),km.set(1,0),s1.set(1,1);let l=e.ray.intersectTriangle(dc,_l,cc,!1,Sl);if(l===null&&(fc(_l.set(-.5,.5,0),Bs,s,Fs,r,i),km.set(0,1),l=e.ray.intersectTriangle(dc,cc,_l,!1,Sl),l===null))return;let u=e.ray.origin.distanceTo(Sl);u<e.near||u>e.far||t.push({distance:u,point:Sl.clone(),uv:Qt.getUV(Sl,dc,_l,cc,i1,km,s1,new le),face:null,object:this})}copy(e){return super.copy(e),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};Jm.prototype.isSprite=!0;function fc(n,e,t,a,r,i){zs.subVectors(n,t).addScalar(.5).multiply(a),r!==void 0?(Ml.x=i*zs.x-r*zs.y,Ml.y=r*zs.x+i*zs.y):Ml.copy(zs),n.copy(e),n.x+=Ml.x,n.y+=Ml.y,n.applyMatrix4(rw)}var o1=new D,l1=new Ye,u1=new Ye,FT=new D,d1=new Fe,Vc=class extends Le{constructor(e,t){super(e,t),this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new Fe,this.bindMatrixInverse=new Fe}copy(e){return super.copy(e),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,this}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Ye,t=this.geometry.attributes.skinWeight;for(let a=0,r=t.count;a<r;a++){e.x=t.getX(a),e.y=t.getY(a),e.z=t.getZ(a),e.w=t.getW(a);let i=1/e.manhattanLength();i!==1/0?e.multiplyScalar(i):e.set(1,0,0,0),t.setXYZW(a,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode==="attached"?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode==="detached"?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}boneTransform(e,t){let a=this.skeleton,r=this.geometry;l1.fromBufferAttribute(r.attributes.skinIndex,e),u1.fromBufferAttribute(r.attributes.skinWeight,e),o1.fromBufferAttribute(r.attributes.position,e).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let i=0;i<4;i++){let s=u1.getComponent(i);if(s!==0){let l=l1.getComponent(i);d1.multiplyMatrices(a.bones[l].matrixWorld,a.boneInverses[l]),t.addScaledVector(FT.copy(o1).applyMatrix4(d1),s)}}return t.applyMatrix4(this.bindMatrixInverse)}};Vc.prototype.isSkinnedMesh=!0;var Qm=class extends Xe{constructor(){super(),this.type="Bone"}};Qm.prototype.isBone=!0;var c1=new Fe,f1=new Fe,pc=[],Ll=new Le,Km=class extends Le{constructor(e,t,a){super(e,t),this.instanceMatrix=new vt(new Float32Array(a*16),16),this.instanceColor=null,this.count=a,this.frustumCulled=!1}copy(e){return super.copy(e),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){let a=this.matrixWorld,r=this.count;if(Ll.geometry=this.geometry,Ll.material=this.material,Ll.material!==void 0)for(let i=0;i<r;i++){this.getMatrixAt(i,c1),f1.multiplyMatrices(a,c1),Ll.matrixWorld=f1,Ll.raycast(e,pc);for(let s=0,l=pc.length;s<l;s++){let u=pc[s];u.instanceId=i,u.object=this,t.push(u)}pc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new vt(new Float32Array(this.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};Km.prototype.isInstancedMesh=!0;var Pi=class extends Bt{constructor(e){super(),this.type="LineBasicMaterial",this.color=new Ce(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.morphTargets=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.morphTargets=e.morphTargets,this}};Pi.prototype.isLineBasicMaterial=!0;var p1=new D,h1=new D,m1=new Fe,Nm=new qr,hc=new Wr,Rl=class extends Xe{constructor(e=new et,t=new Pi){super(),this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e){return super.copy(e),this.material=e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.isBufferGeometry)if(e.index===null){let t=e.attributes.position,a=[0];for(let r=1,i=t.count;r<i;r++)p1.fromBufferAttribute(t,r-1),h1.fromBufferAttribute(t,r),a[r]=a[r-1],a[r]+=p1.distanceTo(h1);e.setAttribute("lineDistance",new it(a,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else e.isGeometry&&console.error("THREE.Line.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");return this}raycast(e,t){let a=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,s=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),hc.copy(a.boundingSphere),hc.applyMatrix4(r),hc.radius+=i,e.ray.intersectsSphere(hc)===!1)return;m1.copy(r).invert(),Nm.copy(e.ray).applyMatrix4(m1);let l=i/((this.scale.x+this.scale.y+this.scale.z)/3),u=l*l,d=new D,f=new D,p=new D,c=new D,m=this.isLineSegments?2:1;if(a.isBufferGeometry){let g=a.index,w=a.attributes.position;if(g!==null){let x=Math.max(0,s.start),h=Math.min(g.count,s.start+s.count);for(let y=x,_=h-1;y<_;y+=m){let b=g.getX(y),M=g.getX(y+1);if(d.fromBufferAttribute(w,b),f.fromBufferAttribute(w,M),Nm.distanceSqToSegment(d,f,c,p)>u)continue;c.applyMatrix4(this.matrixWorld);let k=e.ray.origin.distanceTo(c);k<e.near||k>e.far||t.push({distance:k,point:p.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}else{let x=Math.max(0,s.start),h=Math.min(w.count,s.start+s.count);for(let y=x,_=h-1;y<_;y+=m){if(d.fromBufferAttribute(w,y),f.fromBufferAttribute(w,y+1),Nm.distanceSqToSegment(d,f,c,p)>u)continue;c.applyMatrix4(this.matrixWorld);let M=e.ray.origin.distanceTo(c);M<e.near||M>e.far||t.push({distance:M,point:p.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}}else a.isGeometry&&console.error("THREE.Line.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}updateMorphTargets(){let e=this.geometry;if(e.isBufferGeometry){let t=e.morphAttributes,a=Object.keys(t);if(a.length>0){let r=t[a[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=r.length;i<s;i++){let l=r[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=i}}}}else{let t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Line.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")}}};Rl.prototype.isLine=!0;var g1=new D,x1=new D,Gl=class extends Rl{constructor(e,t){super(e,t),this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.isBufferGeometry)if(e.index===null){let t=e.attributes.position,a=[];for(let r=0,i=t.count;r<i;r+=2)g1.fromBufferAttribute(t,r),x1.fromBufferAttribute(t,r+1),a[r]=r===0?0:a[r-1],a[r+1]=a[r]+g1.distanceTo(x1);e.setAttribute("lineDistance",new it(a,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");else e.isGeometry&&console.error("THREE.LineSegments.computeLineDistances() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.");return this}};Gl.prototype.isLineSegments=!0;var eg=class extends Rl{constructor(e,t){super(e,t),this.type="LineLoop"}};eg.prototype.isLineLoop=!0;var Wc=class extends Bt{constructor(e){super(),this.type="PointsMaterial",this.color=new Ce(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.morphTargets=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.morphTargets=e.morphTargets,this}};Wc.prototype.isPointsMaterial=!0;var v1=new Fe,tg=new qr,mc=new Wr,gc=new D,ng=class extends Xe{constructor(e=new et,t=new Wc){super(),this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e){return super.copy(e),this.material=e.material,this.geometry=e.geometry,this}raycast(e,t){let a=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,s=a.drawRange;if(a.boundingSphere===null&&a.computeBoundingSphere(),mc.copy(a.boundingSphere),mc.applyMatrix4(r),mc.radius+=i,e.ray.intersectsSphere(mc)===!1)return;v1.copy(r).invert(),tg.copy(e.ray).applyMatrix4(v1);let l=i/((this.scale.x+this.scale.y+this.scale.z)/3),u=l*l;if(a.isBufferGeometry){let d=a.index,p=a.attributes.position;if(d!==null){let c=Math.max(0,s.start),m=Math.min(d.count,s.start+s.count);for(let g=c,v=m;g<v;g++){let w=d.getX(g);gc.fromBufferAttribute(p,w),y1(gc,w,u,r,e,t,this)}}else{let c=Math.max(0,s.start),m=Math.min(p.count,s.start+s.count);for(let g=c,v=m;g<v;g++)gc.fromBufferAttribute(p,g),y1(gc,g,u,r,e,t,this)}}else console.error("THREE.Points.raycast() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.")}updateMorphTargets(){let e=this.geometry;if(e.isBufferGeometry){let t=e.morphAttributes,a=Object.keys(t);if(a.length>0){let r=t[a[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=r.length;i<s;i++){let l=r[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=i}}}}else{let t=e.morphTargets;t!==void 0&&t.length>0&&console.error("THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.")}}};ng.prototype.isPoints=!0;function y1(n,e,t,a,r,i,s){let l=tg.distanceSqToPoint(n);if(l<t){let u=new D;tg.closestPointToPoint(n,u),u.applyMatrix4(a);let d=r.ray.origin.distanceTo(u);if(d<r.near||d>r.far)return;i.push({distance:d,distanceToRay:Math.sqrt(l),point:u,index:e,face:null,object:s})}}var ag=class extends Kt{constructor(e,t,a,r,i,s,l,u,d){super(e,t,a,r,i,s,l,u,d),this.format=l!==void 0?l:Ai,this.minFilter=s!==void 0?s:Wn,this.magFilter=i!==void 0?i:Wn,this.generateMipmaps=!1;let f=this;function p(){f.needsUpdate=!0,e.requestVideoFrameCallback(p)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(p)}clone(){return new this.constructor(this.image).copy(this)}update(){let e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}};ag.prototype.isVideoTexture=!0;var rg=class extends Kt{constructor(e,t,a,r,i,s,l,u,d,f,p,c){super(null,s,l,u,d,f,r,i,p,c),this.image={width:t,height:a},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}};rg.prototype.isCompressedTexture=!0;var Xr=class extends Kt{constructor(e,t,a,r,i,s,l,u,d){super(e,t,a,r,i,s,l,u,d),this.needsUpdate=!0}};Xr.prototype.isCanvasTexture=!0;var ig=class extends Kt{constructor(e,t,a,r,i,s,l,u,d,f){if(f=f!==void 0?f:qs,f!==qs&&f!==Fl)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");a===void 0&&f===qs&&(a=Ec),a===void 0&&f===Fl&&(a=kl),super(null,r,i,s,l,u,f,a,d),this.image={width:e,height:t},this.magFilter=l!==void 0?l:Rt,this.minFilter=u!==void 0?u:Rt,this.flipY=!1,this.generateMipmaps=!1}};ig.prototype.isDepthTexture=!0;var Yr=class extends et{constructor(e=1,t=1,a=1,r=8,i=1,s=!1,l=0,u=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:a,radialSegments:r,heightSegments:i,openEnded:s,thetaStart:l,thetaLength:u};let d=this;r=Math.floor(r),i=Math.floor(i);let f=[],p=[],c=[],m=[],g=0,v=[],w=a/2,x=0;h(),s===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(f),this.setAttribute("position",new it(p,3)),this.setAttribute("normal",new it(c,3)),this.setAttribute("uv",new it(m,2));function h(){let _=new D,b=new D,M=0,S=(t-e)/a;for(let k=0;k<=i;k++){let E=[],B=k/i,$=B*(t-e)+e;for(let G=0;G<=r;G++){let A=G/r,O=A*u+l,N=Math.sin(O),C=Math.cos(O);b.x=$*N,b.y=-B*a+w,b.z=$*C,p.push(b.x,b.y,b.z),_.set(N,S,C).normalize(),c.push(_.x,_.y,_.z),m.push(A,1-B),E.push(g++)}v.push(E)}for(let k=0;k<r;k++)for(let E=0;E<i;E++){let B=v[E][k],$=v[E+1][k],G=v[E+1][k+1],A=v[E][k+1];f.push(B,$,A),f.push($,G,A),M+=6}d.addGroup(x,M,0),x+=M}function y(_){let b=g,M=new le,S=new D,k=0,E=_===!0?e:t,B=_===!0?1:-1;for(let G=1;G<=r;G++)p.push(0,w*B,0),c.push(0,B,0),m.push(.5,.5),g++;let $=g;for(let G=0;G<=r;G++){let O=G/r*u+l,N=Math.cos(O),C=Math.sin(O);S.x=E*C,S.y=w*B,S.z=E*N,p.push(S.x,S.y,S.z),c.push(0,B,0),M.x=N*.5+.5,M.y=C*.5*B+.5,m.push(M.x,M.y),g++}for(let G=0;G<r;G++){let A=b+G,O=$+G;_===!0?f.push(O,O+1,A):f.push(O+1,O,A),k+=3}d.addGroup(x,k,_===!0?1:2),x+=k}}};var T3=new D,A3=new D,k3=new D,N3=new Qt;var BT={triangulate:function(n,e,t){t=t||2;let a=e&&e.length,r=a?e[0]*t:n.length,i=iw(n,0,r,t,!0),s=[];if(!i||i.next===i.prev)return s;let l,u,d,f,p,c,m;if(a&&(i=RT(n,e,i,t)),n.length>80*t){l=d=n[0],u=f=n[1];for(let g=t;g<r;g+=t)p=n[g],c=n[g+1],p<l&&(l=p),c<u&&(u=c),p>d&&(d=p),c>f&&(f=c);m=Math.max(d-l,f-u),m=m!==0?1/m:0}return Vl(i,s,t,l,u,m),s}};function iw(n,e,t,a,r){let i,s;if(r===QT(n,e,t,a)>0)for(i=e;i<t;i+=a)s=b1(i,n[i],n[i+1],s);else for(i=t-a;i>=e;i-=a)s=b1(i,n[i],n[i+1],s);return s&&cf(s,s.next)&&(ql(s),s=s.next),s}function Zr(n,e){if(!n)return n;e||(e=n);let t=n,a;do if(a=!1,!t.steiner&&(cf(t,t.next)||gt(t.prev,t,t.next)===0)){if(ql(t),t=e=t.prev,t===t.next)break;a=!0}else t=t.next;while(a||t!==e);return e}function Vl(n,e,t,a,r,i,s){if(!n)return;!s&&i&&$T(n,a,r,i);let l=n,u,d;for(;n.prev!==n.next;){if(u=n.prev,d=n.next,i?OT(n,a,r,i):zT(n)){e.push(u.i/t),e.push(n.i/t),e.push(d.i/t),ql(n),n=d.next,l=d.next;continue}if(n=d,n===l){s?s===1?(n=HT(Zr(n),e,t),Vl(n,e,t,a,r,i,2)):s===2&&UT(n,e,t,a,r,i):Vl(Zr(n),e,t,a,r,i,1);break}}}function zT(n){let e=n.prev,t=n,a=n.next;if(gt(e,t,a)>=0)return!1;let r=n.next.next;for(;r!==n.prev;){if(Vs(e.x,e.y,t.x,t.y,a.x,a.y,r.x,r.y)&&gt(r.prev,r,r.next)>=0)return!1;r=r.next}return!0}function OT(n,e,t,a){let r=n.prev,i=n,s=n.next;if(gt(r,i,s)>=0)return!1;let l=r.x<i.x?r.x<s.x?r.x:s.x:i.x<s.x?i.x:s.x,u=r.y<i.y?r.y<s.y?r.y:s.y:i.y<s.y?i.y:s.y,d=r.x>i.x?r.x>s.x?r.x:s.x:i.x>s.x?i.x:s.x,f=r.y>i.y?r.y>s.y?r.y:s.y:i.y>s.y?i.y:s.y,p=sg(l,u,e,t,a),c=sg(d,f,e,t,a),m=n.prevZ,g=n.nextZ;for(;m&&m.z>=p&&g&&g.z<=c;){if(m!==n.prev&&m!==n.next&&Vs(r.x,r.y,i.x,i.y,s.x,s.y,m.x,m.y)&&gt(m.prev,m,m.next)>=0||(m=m.prevZ,g!==n.prev&&g!==n.next&&Vs(r.x,r.y,i.x,i.y,s.x,s.y,g.x,g.y)&&gt(g.prev,g,g.next)>=0))return!1;g=g.nextZ}for(;m&&m.z>=p;){if(m!==n.prev&&m!==n.next&&Vs(r.x,r.y,i.x,i.y,s.x,s.y,m.x,m.y)&&gt(m.prev,m,m.next)>=0)return!1;m=m.prevZ}for(;g&&g.z<=c;){if(g!==n.prev&&g!==n.next&&Vs(r.x,r.y,i.x,i.y,s.x,s.y,g.x,g.y)&&gt(g.prev,g,g.next)>=0)return!1;g=g.nextZ}return!0}function HT(n,e,t){let a=n;do{let r=a.prev,i=a.next.next;!cf(r,i)&&sw(r,a,a.next,i)&&Wl(r,i)&&Wl(i,r)&&(e.push(r.i/t),e.push(a.i/t),e.push(i.i/t),ql(a),ql(a.next),a=n=i),a=a.next}while(a!==n);return Zr(a)}function UT(n,e,t,a,r,i){let s=n;do{let l=s.next.next;for(;l!==s.prev;){if(s.i!==l.i&&YT(s,l)){let u=ow(s,l);s=Zr(s,s.next),u=Zr(u,u.next),Vl(s,e,t,a,r,i),Vl(u,e,t,a,r,i);return}l=l.next}s=s.next}while(s!==n)}function RT(n,e,t,a){let r=[],i,s,l,u,d;for(i=0,s=e.length;i<s;i++)l=e[i]*a,u=i<s-1?e[i+1]*a:n.length,d=iw(n,l,u,a,!1),d===d.next&&(d.steiner=!0),r.push(XT(d));for(r.sort(GT),i=0;i<r.length;i++)VT(r[i],t),t=Zr(t,t.next);return t}function GT(n,e){return n.x-e.x}function VT(n,e){if(e=WT(n,e),e){let t=ow(e,n);Zr(e,e.next),Zr(t,t.next)}}function WT(n,e){let t=e,a=n.x,r=n.y,i=-1/0,s;do{if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let c=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(c<=a&&c>i){if(i=c,c===a){if(r===t.y)return t;if(r===t.next.y)return t.next}s=t.x<t.next.x?t:t.next}}t=t.next}while(t!==e);if(!s)return null;if(a===i)return s;let l=s,u=s.x,d=s.y,f=1/0,p;t=s;do a>=t.x&&t.x>=u&&a!==t.x&&Vs(r<d?a:i,r,u,d,r<d?i:a,r,t.x,t.y)&&(p=Math.abs(r-t.y)/(a-t.x),Wl(t,n)&&(p<f||p===f&&(t.x>s.x||t.x===s.x&&qT(s,t)))&&(s=t,f=p)),t=t.next;while(t!==l);return s}function qT(n,e){return gt(n.prev,n,e.prev)<0&&gt(e.next,n,n.next)<0}function $T(n,e,t,a){let r=n;do r.z===null&&(r.z=sg(r.x,r.y,e,t,a)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,jT(r)}function jT(n){let e,t,a,r,i,s,l,u,d=1;do{for(t=n,n=null,i=null,s=0;t;){for(s++,a=t,l=0,e=0;e<d&&(l++,a=a.nextZ,!!a);e++);for(u=d;l>0||u>0&&a;)l!==0&&(u===0||!a||t.z<=a.z)?(r=t,t=t.nextZ,l--):(r=a,a=a.nextZ,u--),i?i.nextZ=r:n=r,r.prevZ=i,i=r;t=a}i.nextZ=null,d*=2}while(s>1);return n}function sg(n,e,t,a,r){return n=32767*(n-t)*r,e=32767*(e-a)*r,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function XT(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Vs(n,e,t,a,r,i,s,l){return(r-s)*(e-l)-(n-s)*(i-l)>=0&&(n-s)*(a-l)-(t-s)*(e-l)>=0&&(t-s)*(i-l)-(r-s)*(a-l)>=0}function YT(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!ZT(n,e)&&(Wl(n,e)&&Wl(e,n)&&JT(n,e)&&(gt(n.prev,n,e.prev)||gt(n,e.prev,e))||cf(n,e)&&gt(n.prev,n,n.next)>0&&gt(e.prev,e,e.next)>0)}function gt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function cf(n,e){return n.x===e.x&&n.y===e.y}function sw(n,e,t,a){let r=vc(gt(n,e,t)),i=vc(gt(n,e,a)),s=vc(gt(t,a,n)),l=vc(gt(t,a,e));return!!(r!==i&&s!==l||r===0&&xc(n,t,e)||i===0&&xc(n,a,e)||s===0&&xc(t,n,a)||l===0&&xc(t,e,a))}function xc(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function vc(n){return n>0?1:n<0?-1:0}function ZT(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&sw(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function Wl(n,e){return gt(n.prev,n,n.next)<0?gt(n,e,n.next)>=0&&gt(n,n.prev,e)>=0:gt(n,e,n.prev)<0||gt(n,n.next,e)<0}function JT(n,e){let t=n,a=!1,r=(n.x+e.x)/2,i=(n.y+e.y)/2;do t.y>i!=t.next.y>i&&t.next.y!==t.y&&r<(t.next.x-t.x)*(i-t.y)/(t.next.y-t.y)+t.x&&(a=!a),t=t.next;while(t!==n);return a}function ow(n,e){let t=new og(n.i,n.x,n.y),a=new og(e.i,e.x,e.y),r=n.next,i=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,a.next=t,t.prev=a,i.next=a,a.prev=i,a}function b1(n,e,t,a){let r=new og(n,e,t);return a?(r.next=a.next,r.prev=a,a.next.prev=r,a.next=r):(r.prev=r,r.next=r),r}function ql(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function og(n,e,t){this.i=n,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}function QT(n,e,t,a){let r=0;for(let i=e,s=t-a;i<t;i+=a)r+=(n[s]-n[i])*(n[i+1]+n[s+1]),s=i;return r}var er=class n{static area(e){let t=e.length,a=0;for(let r=t-1,i=0;i<t;r=i++)a+=e[r].x*e[i].y-e[i].x*e[r].y;return a*.5}static isClockWise(e){return n.area(e)<0}static triangulateShape(e,t){let a=[],r=[],i=[];w1(e),S1(a,e);let s=e.length;t.forEach(w1);for(let u=0;u<t.length;u++)r.push(s),s+=t[u].length,S1(a,t[u]);let l=BT.triangulate(a,r);for(let u=0;u<l.length;u+=3)i.push(l.slice(u,u+3));return i}};function w1(n){let e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function S1(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}var Pn=class extends et{constructor(e,t){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let a=this,r=[],i=[];for(let l=0,u=e.length;l<u;l++){let d=e[l];s(d)}this.setAttribute("position",new it(r,3)),this.setAttribute("uv",new it(i,2)),this.computeVertexNormals();function s(l){let u=[],d=t.curveSegments!==void 0?t.curveSegments:12,f=t.steps!==void 0?t.steps:1,p=t.depth!==void 0?t.depth:100,c=t.bevelEnabled!==void 0?t.bevelEnabled:!0,m=t.bevelThickness!==void 0?t.bevelThickness:6,g=t.bevelSize!==void 0?t.bevelSize:m-2,v=t.bevelOffset!==void 0?t.bevelOffset:0,w=t.bevelSegments!==void 0?t.bevelSegments:3,x=t.extrudePath,h=t.UVGenerator!==void 0?t.UVGenerator:KT;t.amount!==void 0&&(console.warn("THREE.ExtrudeBufferGeometry: amount has been renamed to depth."),p=t.amount);let y,_=!1,b,M,S,k;x&&(y=x.getSpacedPoints(f),_=!0,c=!1,b=x.computeFrenetFrames(f,!1),M=new D,S=new D,k=new D),c||(w=0,m=0,g=0,v=0);let E=l.extractPoints(d),B=E.shape,$=E.holes;if(!er.isClockWise(B)){B=B.reverse();for(let re=0,se=$.length;re<se;re++){let fe=$[re];er.isClockWise(fe)&&($[re]=fe.reverse())}}let A=er.triangulateShape(B,$),O=B;for(let re=0,se=$.length;re<se;re++){let fe=$[re];B=B.concat(fe)}function N(re,se,fe){return se||console.error("THREE.ExtrudeGeometry: vec does not exist"),se.clone().multiplyScalar(fe).add(re)}let C=B.length,W=A.length;function X(re,se,fe){let he,H,L,T=re.x-se.x,j=re.y-se.y,Q=fe.x-re.x,pe=fe.y-re.y,we=T*T+j*j,Re=T*pe-j*Q;if(Math.abs(Re)>Number.EPSILON){let Pe=Math.sqrt(we),U=Math.sqrt(Q*Q+pe*pe),me=se.x-j/Pe,ve=se.y+T/Pe,Ee=fe.x-pe/U,ae=fe.y+Q/U,Oe=((Ee-me)*pe-(ae-ve)*Q)/(T*pe-j*Q);he=me+T*Oe-re.x,H=ve+j*Oe-re.y;let $e=he*he+H*H;if($e<=2)return new le(he,H);L=Math.sqrt($e/2)}else{let Pe=!1;T>Number.EPSILON?Q>Number.EPSILON&&(Pe=!0):T<-Number.EPSILON?Q<-Number.EPSILON&&(Pe=!0):Math.sign(j)===Math.sign(pe)&&(Pe=!0),Pe?(he=-j,H=T,L=Math.sqrt(we)):(he=T,H=j,L=Math.sqrt(we/2))}return new le(he/L,H/L)}let R=[];for(let re=0,se=O.length,fe=se-1,he=re+1;re<se;re++,fe++,he++)fe===se&&(fe=0),he===se&&(he=0),R[re]=X(O[re],O[fe],O[he]);let K=[],ne,Y=R.concat();for(let re=0,se=$.length;re<se;re++){let fe=$[re];ne=[];for(let he=0,H=fe.length,L=H-1,T=he+1;he<H;he++,L++,T++)L===H&&(L=0),T===H&&(T=0),ne[he]=X(fe[he],fe[L],fe[T]);K.push(ne),Y=Y.concat(ne)}for(let re=0;re<w;re++){let se=re/w,fe=m*Math.cos(se*Math.PI/2),he=g*Math.sin(se*Math.PI/2)+v;for(let H=0,L=O.length;H<L;H++){let T=N(O[H],R[H],he);ge(T.x,T.y,-fe)}for(let H=0,L=$.length;H<L;H++){let T=$[H];ne=K[H];for(let j=0,Q=T.length;j<Q;j++){let pe=N(T[j],ne[j],he);ge(pe.x,pe.y,-fe)}}}let J=g+v;for(let re=0;re<C;re++){let se=c?N(B[re],Y[re],J):B[re];_?(S.copy(b.normals[0]).multiplyScalar(se.x),M.copy(b.binormals[0]).multiplyScalar(se.y),k.copy(y[0]).add(S).add(M),ge(k.x,k.y,k.z)):ge(se.x,se.y,0)}for(let re=1;re<=f;re++)for(let se=0;se<C;se++){let fe=c?N(B[se],Y[se],J):B[se];_?(S.copy(b.normals[re]).multiplyScalar(fe.x),M.copy(b.binormals[re]).multiplyScalar(fe.y),k.copy(y[re]).add(S).add(M),ge(k.x,k.y,k.z)):ge(fe.x,fe.y,p/f*re)}for(let re=w-1;re>=0;re--){let se=re/w,fe=m*Math.cos(se*Math.PI/2),he=g*Math.sin(se*Math.PI/2)+v;for(let H=0,L=O.length;H<L;H++){let T=N(O[H],R[H],he);ge(T.x,T.y,p+fe)}for(let H=0,L=$.length;H<L;H++){let T=$[H];ne=K[H];for(let j=0,Q=T.length;j<Q;j++){let pe=N(T[j],ne[j],he);_?ge(pe.x,pe.y+y[f-1].y,y[f-1].x+fe):ge(pe.x,pe.y,p+fe)}}}z(),q();function z(){let re=r.length/3;if(c){let se=0,fe=C*se;for(let he=0;he<W;he++){let H=A[he];ye(H[2]+fe,H[1]+fe,H[0]+fe)}se=f+w*2,fe=C*se;for(let he=0;he<W;he++){let H=A[he];ye(H[0]+fe,H[1]+fe,H[2]+fe)}}else{for(let se=0;se<W;se++){let fe=A[se];ye(fe[2],fe[1],fe[0])}for(let se=0;se<W;se++){let fe=A[se];ye(fe[0]+C*f,fe[1]+C*f,fe[2]+C*f)}}a.addGroup(re,r.length/3-re,0)}function q(){let re=r.length/3,se=0;de(O,se),se+=O.length;for(let fe=0,he=$.length;fe<he;fe++){let H=$[fe];de(H,se),se+=H.length}a.addGroup(re,r.length/3-re,1)}function de(re,se){let fe=re.length;for(;--fe>=0;){let he=fe,H=fe-1;H<0&&(H=re.length-1);for(let L=0,T=f+w*2;L<T;L++){let j=C*L,Q=C*(L+1),pe=se+he+j,we=se+H+j,Re=se+H+Q,Pe=se+he+Q;Ne(pe,we,Re,Pe)}}}function ge(re,se,fe){u.push(re),u.push(se),u.push(fe)}function ye(re,se,fe){ce(re),ce(se),ce(fe);let he=r.length/3,H=h.generateTopUV(a,r,he-3,he-2,he-1);ze(H[0]),ze(H[1]),ze(H[2])}function Ne(re,se,fe,he){ce(re),ce(se),ce(he),ce(se),ce(fe),ce(he);let H=r.length/3,L=h.generateSideWallUV(a,r,H-6,H-3,H-2,H-1);ze(L[0]),ze(L[1]),ze(L[3]),ze(L[1]),ze(L[2]),ze(L[3])}function ce(re){r.push(u[re*3+0]),r.push(u[re*3+1]),r.push(u[re*3+2])}function ze(re){i.push(re.x),i.push(re.y)}}}toJSON(){let e=et.prototype.toJSON.call(this),t=this.parameters.shapes,a=this.parameters.options;return eA(t,a,e)}},KT={generateTopUV:function(n,e,t,a,r){let i=e[t*3],s=e[t*3+1],l=e[a*3],u=e[a*3+1],d=e[r*3],f=e[r*3+1];return[new le(i,s),new le(l,u),new le(d,f)]},generateSideWallUV:function(n,e,t,a,r,i){let s=e[t*3],l=e[t*3+1],u=e[t*3+2],d=e[a*3],f=e[a*3+1],p=e[a*3+2],c=e[r*3],m=e[r*3+1],g=e[r*3+2],v=e[i*3],w=e[i*3+1],x=e[i*3+2];return Math.abs(l-f)<.01?[new le(s,1-u),new le(d,1-p),new le(c,1-g),new le(v,1-x)]:[new le(l,1-u),new le(f,1-p),new le(m,1-g),new le(w,1-x)]}};function eA(n,e,t){if(t.shapes=[],Array.isArray(n))for(let a=0,r=n.length;a<r;a++){let i=n[a];t.shapes.push(i.uuid)}else t.shapes.push(n.uuid);return e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var lg=class extends et{constructor(e,t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let a=[],r=[],i=[],s=[],l=0,u=0;if(Array.isArray(e)===!1)d(e);else for(let f=0;f<e.length;f++)d(e[f]),this.addGroup(l,u,f),l+=u,u=0;this.setIndex(a),this.setAttribute("position",new it(r,3)),this.setAttribute("normal",new it(i,3)),this.setAttribute("uv",new it(s,2));function d(f){let p=r.length/3,c=f.extractPoints(t),m=c.shape,g=c.holes;er.isClockWise(m)===!1&&(m=m.reverse());for(let w=0,x=g.length;w<x;w++){let h=g[w];er.isClockWise(h)===!0&&(g[w]=h.reverse())}let v=er.triangulateShape(m,g);for(let w=0,x=g.length;w<x;w++){let h=g[w];m=m.concat(h)}for(let w=0,x=m.length;w<x;w++){let h=m[w];r.push(h.x,h.y,0),i.push(0,0,1),s.push(h.x,h.y)}for(let w=0,x=v.length;w<x;w++){let h=v[w],y=h[0]+p,_=h[1]+p,b=h[2]+p;a.push(y,_,b),u+=3}}}toJSON(){let e=et.prototype.toJSON.call(this),t=this.parameters.shapes;return tA(t,e)}};function tA(n,e){if(e.shapes=[],Array.isArray(n))for(let t=0,a=n.length;t<a;t++){let r=n[t];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e}var Js=class extends et{constructor(e=1,t=.4,a=8,r=6,i=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:a,tubularSegments:r,arc:i},a=Math.floor(a),r=Math.floor(r);let s=[],l=[],u=[],d=[],f=new D,p=new D,c=new D;for(let m=0;m<=a;m++)for(let g=0;g<=r;g++){let v=g/r*i,w=m/a*Math.PI*2;p.x=(e+t*Math.cos(w))*Math.cos(v),p.y=(e+t*Math.cos(w))*Math.sin(v),p.z=t*Math.sin(w),l.push(p.x,p.y,p.z),f.x=e*Math.cos(v),f.y=e*Math.sin(v),c.subVectors(p,f).normalize(),u.push(c.x,c.y,c.z),d.push(g/r),d.push(m/a)}for(let m=1;m<=a;m++)for(let g=1;g<=r;g++){let v=(r+1)*m+g-1,w=(r+1)*(m-1)+g-1,x=(r+1)*(m-1)+g,h=(r+1)*m+g;s.push(v,w,h),s.push(w,x,h)}this.setIndex(s),this.setAttribute("position",new it(l,3)),this.setAttribute("normal",new it(u,3)),this.setAttribute("uv",new it(d,2))}};var ug=class extends Bt{constructor(e){super(),this.type="ShadowMaterial",this.color=new Ce(0),this.transparent=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this}};ug.prototype.isShadowMaterial=!0;var Qs=class extends nr{constructor(e){super(e),this.type="RawShaderMaterial"}};Qs.prototype.isRawShaderMaterial=!0;var bt=class extends Bt{constructor(e){super(),this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ce(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=so,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.vertexTangents=!1,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.flatShading=e.flatShading,this.vertexTangents=e.vertexTangents,this}};bt.prototype.isMeshStandardMaterial=!0;var $l=class extends bt{constructor(e){super(),this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.clearcoat=0,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new le(1,1),this.clearcoatNormalMap=null,this.reflectivity=.5,Object.defineProperty(this,"ior",{get:function(){return(1+.4*this.reflectivity)/(1-.4*this.reflectivity)},set:function(t){this.reflectivity=wn(2.5*(t-1)/(t+1),0,1)}}),this.sheen=null,this.transmission=0,this.transmissionMap=null,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.reflectivity=e.reflectivity,e.sheen?this.sheen=(this.sheen||new Ce).copy(e.sheen):this.sheen=null,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this}};$l.prototype.isMeshPhysicalMaterial=!0;var dg=class extends Bt{constructor(e){super(),this.type="MeshPhongMaterial",this.color=new Ce(16777215),this.specular=new Ce(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=so,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=lf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.flatShading=e.flatShading,this}};dg.prototype.isMeshPhongMaterial=!0;var cg=class extends Bt{constructor(e){super(),this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Ce(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=so,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this}};cg.prototype.isMeshToonMaterial=!0;var fg=class extends Bt{constructor(e){super(),this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=so,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.flatShading=e.flatShading,this}};fg.prototype.isMeshNormalMaterial=!0;var pg=class extends Bt{constructor(e){super(),this.type="MeshLambertMaterial",this.color=new Ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=lf,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this}};pg.prototype.isMeshLambertMaterial=!0;var hg=class extends Bt{constructor(e){super(),this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new Ce(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=so,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.skinning=e.skinning,this.morphTargets=e.morphTargets,this.morphNormals=e.morphNormals,this.flatShading=e.flatShading,this}};hg.prototype.isMeshMatcapMaterial=!0;var mg=class extends Pi{constructor(e){super(),this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};mg.prototype.isLineDashedMaterial=!0;var ct={arraySlice:function(n,e,t){return ct.isTypedArray(n)?new n.constructor(n.subarray(e,t!==void 0?t:n.length)):n.slice(e,t)},convertArray:function(n,e,t){return!n||!t&&n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)},isTypedArray:function(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)},getKeyframeOrder:function(n){function e(r,i){return n[r]-n[i]}let t=n.length,a=new Array(t);for(let r=0;r!==t;++r)a[r]=r;return a.sort(e),a},sortedArray:function(n,e,t){let a=n.length,r=new n.constructor(a);for(let i=0,s=0;s!==a;++i){let l=t[i]*e;for(let u=0;u!==e;++u)r[s++]=n[l+u]}return r},flattenJSON:function(n,e,t,a){let r=1,i=n[0];for(;i!==void 0&&i[a]===void 0;)i=n[r++];if(i===void 0)return;let s=i[a];if(s!==void 0)if(Array.isArray(s))do s=i[a],s!==void 0&&(e.push(i.time),t.push.apply(t,s)),i=n[r++];while(i!==void 0);else if(s.toArray!==void 0)do s=i[a],s!==void 0&&(e.push(i.time),s.toArray(t,t.length)),i=n[r++];while(i!==void 0);else do s=i[a],s!==void 0&&(e.push(i.time),t.push(s)),i=n[r++];while(i!==void 0)},subclip:function(n,e,t,a,r=30){let i=n.clone();i.name=e;let s=[];for(let u=0;u<i.tracks.length;++u){let d=i.tracks[u],f=d.getValueSize(),p=[],c=[];for(let m=0;m<d.times.length;++m){let g=d.times[m]*r;if(!(g<t||g>=a)){p.push(d.times[m]);for(let v=0;v<f;++v)c.push(d.values[m*f+v])}}p.length!==0&&(d.times=ct.convertArray(p,d.times.constructor),d.values=ct.convertArray(c,d.values.constructor),s.push(d))}i.tracks=s;let l=1/0;for(let u=0;u<i.tracks.length;++u)l>i.tracks[u].times[0]&&(l=i.tracks[u].times[0]);for(let u=0;u<i.tracks.length;++u)i.tracks[u].shift(-1*l);return i.resetDuration(),i},makeClipAdditive:function(n,e=0,t=n,a=30){a<=0&&(a=30);let r=t.tracks.length,i=e/a;for(let s=0;s<r;++s){let l=t.tracks[s],u=l.ValueTypeName;if(u==="bool"||u==="string")continue;let d=n.tracks.find(function(x){return x.name===l.name&&x.ValueTypeName===u});if(d===void 0)continue;let f=0,p=l.getValueSize();l.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(f=p/3);let c=0,m=d.getValueSize();d.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(c=m/3);let g=l.times.length-1,v;if(i<=l.times[0]){let x=f,h=p-f;v=ct.arraySlice(l.values,x,h)}else if(i>=l.times[g]){let x=g*p+f,h=x+p-f;v=ct.arraySlice(l.values,x,h)}else{let x=l.createInterpolant(),h=f,y=p-f;x.evaluate(i),v=ct.arraySlice(x.resultBuffer,h,y)}u==="quaternion"&&new Gt().fromArray(v).normalize().conjugate().toArray(v);let w=d.times.length;for(let x=0;x<w;++x){let h=x*m+c;if(u==="quaternion")Gt.multiplyQuaternionsFlat(d.values,h,v,0,d.values,h);else{let y=m-c*2;for(let _=0;_<y;++_)d.values[h+_]-=v[_]}}}return n.blendMode=V1,n}},Ia=class{constructor(e,t,a,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(a),this.sampleValues=t,this.valueSize=a,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,a=this._cachedIndex,r=t[a],i=t[a-1];e:{t:{let s;n:{a:if(!(e<r)){for(let l=a+2;;){if(r===void 0){if(e<i)break a;return a=t.length,this._cachedIndex=a,this.afterEnd_(a-1,e,i)}if(a===l)break;if(i=r,r=t[++a],e<r)break t}s=t.length;break n}if(!(e>=i)){let l=t[1];e<l&&(a=2,i=l);for(let u=a-2;;){if(i===void 0)return this._cachedIndex=0,this.beforeStart_(0,e,r);if(a===u)break;if(r=i,i=t[--a-1],e>=i)break t}s=a,a=0;break n}break e}for(;a<s;){let l=a+s>>>1;e<t[l]?s=l:a=l+1}if(r=t[a],i=t[a-1],i===void 0)return this._cachedIndex=0,this.beforeStart_(0,e,r);if(r===void 0)return a=t.length,this._cachedIndex=a,this.afterEnd_(a-1,i,e)}this._cachedIndex=a,this.intervalChanged_(a,i,r)}return this.interpolate_(a,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,a=this.sampleValues,r=this.valueSize,i=e*r;for(let s=0;s!==r;++s)t[s]=a[i+s];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}};Ia.prototype.beforeStart_=Ia.prototype.copySampleValue_;Ia.prototype.afterEnd_=Ia.prototype.copySampleValue_;var gg=class extends Ia{constructor(e,t,a,r){super(e,t,a,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Rs,endingEnd:Rs}}intervalChanged_(e,t,a){let r=this.parameterPositions,i=e-2,s=e+1,l=r[i],u=r[s];if(l===void 0)switch(this.getSettings_().endingStart){case Gs:i=e,l=2*t-a;break;case kc:i=r.length-2,l=t+r[i]-r[i+1];break;default:i=e,l=a}if(u===void 0)switch(this.getSettings_().endingEnd){case Gs:s=e,u=2*a-t;break;case kc:s=1,u=a+r[1]-r[0];break;default:s=e-1,u=t}let d=(a-t)*.5,f=this.valueSize;this._weightPrev=d/(t-l),this._weightNext=d/(u-a),this._offsetPrev=i*f,this._offsetNext=s*f}interpolate_(e,t,a,r){let i=this.resultBuffer,s=this.sampleValues,l=this.valueSize,u=e*l,d=u-l,f=this._offsetPrev,p=this._offsetNext,c=this._weightPrev,m=this._weightNext,g=(a-t)/(r-t),v=g*g,w=v*g,x=-c*w+2*c*v-c*g,h=(1+c)*w+(-1.5-2*c)*v+(-.5+c)*g+1,y=(-1-m)*w+(1.5+m)*v+.5*g,_=m*w-m*v;for(let b=0;b!==l;++b)i[b]=x*s[f+b]+h*s[d+b]+y*s[u+b]+_*s[p+b];return i}},qc=class extends Ia{constructor(e,t,a,r){super(e,t,a,r)}interpolate_(e,t,a,r){let i=this.resultBuffer,s=this.sampleValues,l=this.valueSize,u=e*l,d=u-l,f=(a-t)/(r-t),p=1-f;for(let c=0;c!==l;++c)i[c]=s[d+c]*p+s[u+c]*f;return i}},xg=class extends Ia{constructor(e,t,a,r){super(e,t,a,r)}interpolate_(e){return this.copySampleValue_(e-1)}},$n=class{constructor(e,t,a,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ct.convertArray(t,this.TimeBufferType),this.values=ct.convertArray(a,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,a;if(t.toJSON!==this.toJSON)a=t.toJSON(e);else{a={name:e.name,times:ct.convertArray(e.times,Array),values:ct.convertArray(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(a.interpolation=r)}return a.type=e.ValueTypeName,a}InterpolantFactoryMethodDiscrete(e){return new xg(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new qc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new gg(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Tc:t=this.InterpolantFactoryMethodDiscrete;break;case Ac:t=this.InterpolantFactoryMethodLinear;break;case am:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let a="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(a);return console.warn("THREE.KeyframeTrack:",a),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Tc;case this.InterpolantFactoryMethodLinear:return Ac;case this.InterpolantFactoryMethodSmooth:return am}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let a=0,r=t.length;a!==r;++a)t[a]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let a=0,r=t.length;a!==r;++a)t[a]*=e}return this}trim(e,t){let a=this.times,r=a.length,i=0,s=r-1;for(;i!==r&&a[i]<e;)++i;for(;s!==-1&&a[s]>t;)--s;if(++s,i!==0||s!==r){i>=s&&(s=Math.max(s,1),i=s-1);let l=this.getValueSize();this.times=ct.arraySlice(a,i,s),this.values=ct.arraySlice(this.values,i*l,s*l)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let a=this.times,r=this.values,i=a.length;i===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let s=null;for(let l=0;l!==i;l++){let u=a[l];if(typeof u=="number"&&isNaN(u)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,l,u),e=!1;break}if(s!==null&&s>u){console.error("THREE.KeyframeTrack: Out of order keys.",this,l,u,s),e=!1;break}s=u}if(r!==void 0&&ct.isTypedArray(r))for(let l=0,u=r.length;l!==u;++l){let d=r[l];if(isNaN(d)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,l,d),e=!1;break}}return e}optimize(){let e=ct.arraySlice(this.times),t=ct.arraySlice(this.values),a=this.getValueSize(),r=this.getInterpolation()===am,i=e.length-1,s=1;for(let l=1;l<i;++l){let u=!1,d=e[l],f=e[l+1];if(d!==f&&(l!==1||d!==e[0]))if(r)u=!0;else{let p=l*a,c=p-a,m=p+a;for(let g=0;g!==a;++g){let v=t[p+g];if(v!==t[c+g]||v!==t[m+g]){u=!0;break}}}if(u){if(l!==s){e[s]=e[l];let p=l*a,c=s*a;for(let m=0;m!==a;++m)t[c+m]=t[p+m]}++s}}if(i>0){e[s]=e[i];for(let l=i*a,u=s*a,d=0;d!==a;++d)t[u+d]=t[l+d];++s}return s!==e.length?(this.times=ct.arraySlice(e,0,s),this.values=ct.arraySlice(t,0,s*a)):(this.times=e,this.values=t),this}clone(){let e=ct.arraySlice(this.times,0),t=ct.arraySlice(this.values,0),a=this.constructor,r=new a(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};$n.prototype.TimeBufferType=Float32Array;$n.prototype.ValueBufferType=Float32Array;$n.prototype.DefaultInterpolation=Ac;var Jr=class extends $n{};Jr.prototype.ValueTypeName="bool";Jr.prototype.ValueBufferType=Array;Jr.prototype.DefaultInterpolation=Tc;Jr.prototype.InterpolantFactoryMethodLinear=void 0;Jr.prototype.InterpolantFactoryMethodSmooth=void 0;var $c=class extends $n{};$c.prototype.ValueTypeName="color";var Ks=class extends $n{};Ks.prototype.ValueTypeName="number";var vg=class extends Ia{constructor(e,t,a,r){super(e,t,a,r)}interpolate_(e,t,a,r){let i=this.resultBuffer,s=this.sampleValues,l=this.valueSize,u=(a-t)/(r-t),d=e*l;for(let f=d+l;d!==f;d+=4)Gt.slerpFlat(i,0,s,d-l,s,d,u);return i}},Di=class extends $n{InterpolantFactoryMethodLinear(e){return new vg(this.times,this.values,this.getValueSize(),e)}};Di.prototype.ValueTypeName="quaternion";Di.prototype.DefaultInterpolation=Ac;Di.prototype.InterpolantFactoryMethodSmooth=void 0;var Qr=class extends $n{};Qr.prototype.ValueTypeName="string";Qr.prototype.ValueBufferType=Array;Qr.prototype.DefaultInterpolation=Tc;Qr.prototype.InterpolantFactoryMethodLinear=void 0;Qr.prototype.InterpolantFactoryMethodSmooth=void 0;var eo=class extends $n{};eo.prototype.ValueTypeName="vector";var jc=class{constructor(e,t=-1,a,r=t0){this.name=e,this.tracks=a,this.duration=t,this.blendMode=r,this.uuid=ca(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],a=e.tracks,r=1/(e.fps||1);for(let s=0,l=a.length;s!==l;++s)t.push(aA(a[s]).scale(r));let i=new this(e.name,e.duration,t,e.blendMode);return i.uuid=e.uuid,i}static toJSON(e){let t=[],a=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let i=0,s=a.length;i!==s;++i)t.push($n.toJSON(a[i]));return r}static CreateFromMorphTargetSequence(e,t,a,r){let i=t.length,s=[];for(let l=0;l<i;l++){let u=[],d=[];u.push((l+i-1)%i,l,(l+1)%i),d.push(0,1,0);let f=ct.getKeyframeOrder(u);u=ct.sortedArray(u,1,f),d=ct.sortedArray(d,1,f),!r&&u[0]===0&&(u.push(i),d.push(d[0])),s.push(new Ks(".morphTargetInfluences["+t[l].name+"]",u,d).scale(1/a))}return new this(e,-1,s)}static findByName(e,t){let a=e;if(!Array.isArray(e)){let r=e;a=r.geometry&&r.geometry.animations||r.animations}for(let r=0;r<a.length;r++)if(a[r].name===t)return a[r];return null}static CreateClipsFromMorphTargetSequences(e,t,a){let r={},i=/^([\w-]*?)([\d]+)$/;for(let l=0,u=e.length;l<u;l++){let d=e[l],f=d.name.match(i);if(f&&f.length>1){let p=f[1],c=r[p];c||(r[p]=c=[]),c.push(d)}}let s=[];for(let l in r)s.push(this.CreateFromMorphTargetSequence(l,r[l],t,a));return s}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let a=function(p,c,m,g,v){if(m.length!==0){let w=[],x=[];ct.flattenJSON(m,w,x,g),w.length!==0&&v.push(new p(c,w,x))}},r=[],i=e.name||"default",s=e.fps||30,l=e.blendMode,u=e.length||-1,d=e.hierarchy||[];for(let p=0;p<d.length;p++){let c=d[p].keys;if(!(!c||c.length===0))if(c[0].morphTargets){let m={},g;for(g=0;g<c.length;g++)if(c[g].morphTargets)for(let v=0;v<c[g].morphTargets.length;v++)m[c[g].morphTargets[v]]=-1;for(let v in m){let w=[],x=[];for(let h=0;h!==c[g].morphTargets.length;++h){let y=c[g];w.push(y.time),x.push(y.morphTarget===v?1:0)}r.push(new Ks(".morphTargetInfluence["+v+"]",w,x))}u=m.length*(s||1)}else{let m=".bones["+t[p].name+"]";a(eo,m+".position",c,"pos",r),a(Di,m+".quaternion",c,"rot",r),a(eo,m+".scale",c,"scl",r)}}return r.length===0?null:new this(i,u,r,l)}resetDuration(){let e=this.tracks,t=0;for(let a=0,r=e.length;a!==r;++a){let i=this.tracks[a];t=Math.max(t,i.times[i.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function nA(n){switch(n.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ks;case"vector":case"vector2":case"vector3":case"vector4":return eo;case"color":return $c;case"quaternion":return Di;case"bool":case"boolean":return Jr;case"string":return Qr}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+n)}function aA(n){if(n.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=nA(n.type);if(n.times===void 0){let t=[],a=[];ct.flattenJSON(n.keys,t,a,"value"),n.times=t,n.values=a}return e.parse!==void 0?e.parse(n):new e(n.name,n.times,n.values,n.interpolation)}var to={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}},yg=class{constructor(e,t,a){let r=this,i=!1,s=0,l=0,u,d=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=a,this.itemStart=function(f){l++,i===!1&&r.onStart!==void 0&&r.onStart(f,s,l),i=!0},this.itemEnd=function(f){s++,r.onProgress!==void 0&&r.onProgress(f,s,l),s===l&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(f){r.onError!==void 0&&r.onError(f)},this.resolveURL=function(f){return u?u(f):f},this.setURLModifier=function(f){return u=f,this},this.addHandler=function(f,p){return d.push(f,p),this},this.removeHandler=function(f){let p=d.indexOf(f);return p!==-1&&d.splice(p,2),this},this.getHandler=function(f){for(let p=0,c=d.length;p<c;p+=2){let m=d[p],g=d[p+1];if(m.global&&(m.lastIndex=0),m.test(f))return g}return null}}},rA=new yg,Ta=class{constructor(e){this.manager=e!==void 0?e:rA,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let a=this;return new Promise(function(r,i){a.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}},ua={},bg=class extends Ta{constructor(e){super(e)}load(e,t,a,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,s=to.get(e);if(s!==void 0)return i.manager.itemStart(e),setTimeout(function(){t&&t(s),i.manager.itemEnd(e)},0),s;if(ua[e]!==void 0){ua[e].push({onLoad:t,onProgress:a,onError:r});return}let l=/^data:(.*?)(;base64)?,(.*)$/,u=e.match(l),d;if(u){let f=u[1],p=!!u[2],c=u[3];c=decodeURIComponent(c),p&&(c=atob(c));try{let m,g=(this.responseType||"").toLowerCase();switch(g){case"arraybuffer":case"blob":let v=new Uint8Array(c.length);for(let x=0;x<c.length;x++)v[x]=c.charCodeAt(x);g==="blob"?m=new Blob([v.buffer],{type:f}):m=v.buffer;break;case"document":m=new DOMParser().parseFromString(c,f);break;case"json":m=JSON.parse(c);break;default:m=c;break}setTimeout(function(){t&&t(m),i.manager.itemEnd(e)},0)}catch(m){setTimeout(function(){r&&r(m),i.manager.itemError(e),i.manager.itemEnd(e)},0)}}else{ua[e]=[],ua[e].push({onLoad:t,onProgress:a,onError:r}),d=new XMLHttpRequest,d.open("GET",e,!0),d.addEventListener("load",function(f){let p=this.response,c=ua[e];if(delete ua[e],this.status===200||this.status===0){this.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),to.add(e,p);for(let m=0,g=c.length;m<g;m++){let v=c[m];v.onLoad&&v.onLoad(p)}i.manager.itemEnd(e)}else{for(let m=0,g=c.length;m<g;m++){let v=c[m];v.onError&&v.onError(f)}i.manager.itemError(e),i.manager.itemEnd(e)}},!1),d.addEventListener("progress",function(f){let p=ua[e];for(let c=0,m=p.length;c<m;c++){let g=p[c];g.onProgress&&g.onProgress(f)}},!1),d.addEventListener("error",function(f){let p=ua[e];delete ua[e];for(let c=0,m=p.length;c<m;c++){let g=p[c];g.onError&&g.onError(f)}i.manager.itemError(e),i.manager.itemEnd(e)},!1),d.addEventListener("abort",function(f){let p=ua[e];delete ua[e];for(let c=0,m=p.length;c<m;c++){let g=p[c];g.onError&&g.onError(f)}i.manager.itemError(e),i.manager.itemEnd(e)},!1),this.responseType!==void 0&&(d.responseType=this.responseType),this.withCredentials!==void 0&&(d.withCredentials=this.withCredentials),d.overrideMimeType&&d.overrideMimeType(this.mimeType!==void 0?this.mimeType:"text/plain");for(let f in this.requestHeader)d.setRequestHeader(f,this.requestHeader[f]);d.send(null)}return i.manager.itemStart(e),d}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var Xc=class extends Ta{constructor(e){super(e)}load(e,t,a,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,s=to.get(e);if(s!==void 0)return i.manager.itemStart(e),setTimeout(function(){t&&t(s),i.manager.itemEnd(e)},0),s;let l=document.createElementNS("http://www.w3.org/1999/xhtml","img");function u(){l.removeEventListener("load",u,!1),l.removeEventListener("error",d,!1),to.add(e,this),t&&t(this),i.manager.itemEnd(e)}function d(f){l.removeEventListener("load",u,!1),l.removeEventListener("error",d,!1),r&&r(f),i.manager.itemError(e),i.manager.itemEnd(e)}return l.addEventListener("load",u,!1),l.addEventListener("error",d,!1),e.substr(0,5)!=="data:"&&this.crossOrigin!==void 0&&(l.crossOrigin=this.crossOrigin),i.manager.itemStart(e),l.src=e,l}},wg=class extends Ta{constructor(e){super(e)}load(e,t,a,r){let i=new jr,s=new Xc(this.manager);s.setCrossOrigin(this.crossOrigin),s.setPath(this.path);let l=0;function u(d){s.load(e[d],function(f){i.images[d]=f,l++,l===6&&(i.needsUpdate=!0,t&&t(i))},void 0,r)}for(let d=0;d<e.length;++d)u(d);return i}};var Sg=class extends Ta{constructor(e){super(e)}load(e,t,a,r){let i=new Kt,s=new Xc(this.manager);return s.setCrossOrigin(this.crossOrigin),s.setPath(this.path),s.load(e,function(l){i.image=l;let u=e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0;i.format=u?Ai:qn,i.needsUpdate=!0,t!==void 0&&t(i)},a,r),i}},_n=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let a=this.getUtoTmapping(e);return this.getPoint(a,t)}getPoints(e=5){let t=[];for(let a=0;a<=e;a++)t.push(this.getPoint(a/e));return t}getSpacedPoints(e=5){let t=[];for(let a=0;a<=e;a++)t.push(this.getPointAt(a/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],a,r=this.getPoint(0),i=0;t.push(0);for(let s=1;s<=e;s++)a=this.getPoint(s/e),i+=a.distanceTo(r),t.push(i),r=a;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let a=this.getLengths(),r=0,i=a.length,s;t?s=t:s=e*a[i-1];let l=0,u=i-1,d;for(;l<=u;)if(r=Math.floor(l+(u-l)/2),d=a[r]-s,d<0)l=r+1;else if(d>0)u=r-1;else{u=r;break}if(r=u,a[r]===s)return r/(i-1);let f=a[r],c=a[r+1]-f,m=(s-f)/c;return(r+m)/(i-1)}getTangent(e,t){let r=e-1e-4,i=e+1e-4;r<0&&(r=0),i>1&&(i=1);let s=this.getPoint(r),l=this.getPoint(i),u=t||(s.isVector2?new le:new D);return u.copy(l).sub(s).normalize(),u}getTangentAt(e,t){let a=this.getUtoTmapping(e);return this.getTangent(a,t)}computeFrenetFrames(e,t){let a=new D,r=[],i=[],s=[],l=new D,u=new Fe;for(let m=0;m<=e;m++){let g=m/e;r[m]=this.getTangentAt(g,new D),r[m].normalize()}i[0]=new D,s[0]=new D;let d=Number.MAX_VALUE,f=Math.abs(r[0].x),p=Math.abs(r[0].y),c=Math.abs(r[0].z);f<=d&&(d=f,a.set(1,0,0)),p<=d&&(d=p,a.set(0,1,0)),c<=d&&a.set(0,0,1),l.crossVectors(r[0],a).normalize(),i[0].crossVectors(r[0],l),s[0].crossVectors(r[0],i[0]);for(let m=1;m<=e;m++){if(i[m]=i[m-1].clone(),s[m]=s[m-1].clone(),l.crossVectors(r[m-1],r[m]),l.length()>Number.EPSILON){l.normalize();let g=Math.acos(wn(r[m-1].dot(r[m]),-1,1));i[m].applyMatrix4(u.makeRotationAxis(l,g))}s[m].crossVectors(r[m],i[m])}if(t===!0){let m=Math.acos(wn(i[0].dot(i[e]),-1,1));m/=e,r[0].dot(l.crossVectors(i[0],i[e]))>0&&(m=-m);for(let g=1;g<=e;g++)i[g].applyMatrix4(u.makeRotationAxis(r[g],m*g)),s[g].crossVectors(r[g],i[g])}return{tangents:r,normals:i,binormals:s}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.5,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},no=class extends _n{constructor(e=0,t=0,a=1,r=1,i=0,s=Math.PI*2,l=!1,u=0){super(),this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=a,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=s,this.aClockwise=l,this.aRotation=u}getPoint(e,t){let a=t||new le,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,s=Math.abs(i)<Number.EPSILON;for(;i<0;)i+=r;for(;i>r;)i-=r;i<Number.EPSILON&&(s?i=0:i=r),this.aClockwise===!0&&!s&&(i===r?i=-r:i=i-r);let l=this.aStartAngle+e*i,u=this.aX+this.xRadius*Math.cos(l),d=this.aY+this.yRadius*Math.sin(l);if(this.aRotation!==0){let f=Math.cos(this.aRotation),p=Math.sin(this.aRotation),c=u-this.aX,m=d-this.aY;u=c*f-m*p+this.aX,d=c*p+m*f+this.aY}return a.set(u,d)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}};no.prototype.isEllipseCurve=!0;var Yc=class extends no{constructor(e,t,a,r,i,s){super(e,t,a,a,r,i,s),this.type="ArcCurve"}};Yc.prototype.isArcCurve=!0;function r0(){let n=0,e=0,t=0,a=0;function r(i,s,l,u){n=i,e=l,t=-3*i+3*s-2*l-u,a=2*i-2*s+l+u}return{initCatmullRom:function(i,s,l,u,d){r(s,l,d*(l-i),d*(u-s))},initNonuniformCatmullRom:function(i,s,l,u,d,f,p){let c=(s-i)/d-(l-i)/(d+f)+(l-s)/f,m=(l-s)/f-(u-s)/(f+p)+(u-l)/p;c*=f,m*=f,r(s,l,c,m)},calc:function(i){let s=i*i,l=s*i;return n+e*i+t*s+a*l}}}var yc=new D,Pm=new r0,Dm=new r0,Fm=new r0,Zc=class extends _n{constructor(e=[],t=!1,a="centripetal",r=.5){super(),this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=a,this.tension=r}getPoint(e,t=new D){let a=t,r=this.points,i=r.length,s=(i-(this.closed?0:1))*e,l=Math.floor(s),u=s-l;this.closed?l+=l>0?0:(Math.floor(Math.abs(l)/i)+1)*i:u===0&&l===i-1&&(l=i-2,u=1);let d,f;this.closed||l>0?d=r[(l-1)%i]:(yc.subVectors(r[0],r[1]).add(r[0]),d=yc);let p=r[l%i],c=r[(l+1)%i];if(this.closed||l+2<i?f=r[(l+2)%i]:(yc.subVectors(r[i-1],r[i-2]).add(r[i-1]),f=yc),this.curveType==="centripetal"||this.curveType==="chordal"){let m=this.curveType==="chordal"?.5:.25,g=Math.pow(d.distanceToSquared(p),m),v=Math.pow(p.distanceToSquared(c),m),w=Math.pow(c.distanceToSquared(f),m);v<1e-4&&(v=1),g<1e-4&&(g=v),w<1e-4&&(w=v),Pm.initNonuniformCatmullRom(d.x,p.x,c.x,f.x,g,v,w),Dm.initNonuniformCatmullRom(d.y,p.y,c.y,f.y,g,v,w),Fm.initNonuniformCatmullRom(d.z,p.z,c.z,f.z,g,v,w)}else this.curveType==="catmullrom"&&(Pm.initCatmullRom(d.x,p.x,c.x,f.x,this.tension),Dm.initCatmullRom(d.y,p.y,c.y,f.y,this.tension),Fm.initCatmullRom(d.z,p.z,c.z,f.z,this.tension));return a.set(Pm.calc(u),Dm.calc(u),Fm.calc(u)),a}copy(e){super.copy(e),this.points=[];for(let t=0,a=e.points.length;t<a;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,a=this.points.length;t<a;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,a=e.points.length;t<a;t++){let r=e.points[t];this.points.push(new D().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};Zc.prototype.isCatmullRomCurve3=!0;function M1(n,e,t,a,r){let i=(a-e)*.5,s=(r-t)*.5,l=n*n,u=n*l;return(2*t-2*a+i+s)*u+(-3*t+3*a-2*i-s)*l+i*n+t}function iA(n,e){let t=1-n;return t*t*e}function sA(n,e){return 2*(1-n)*n*e}function oA(n,e){return n*n*e}function Pl(n,e,t,a){return iA(n,e)+sA(n,t)+oA(n,a)}function lA(n,e){let t=1-n;return t*t*t*e}function uA(n,e){let t=1-n;return 3*t*t*n*e}function dA(n,e){return 3*(1-n)*n*n*e}function cA(n,e){return n*n*n*e}function Dl(n,e,t,a,r){return lA(n,e)+uA(n,t)+dA(n,a)+cA(n,r)}var jl=class extends _n{constructor(e=new le,t=new le,a=new le,r=new le){super(),this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=a,this.v3=r}getPoint(e,t=new le){let a=t,r=this.v0,i=this.v1,s=this.v2,l=this.v3;return a.set(Dl(e,r.x,i.x,s.x,l.x),Dl(e,r.y,i.y,s.y,l.y)),a}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}};jl.prototype.isCubicBezierCurve=!0;var Jc=class extends _n{constructor(e=new D,t=new D,a=new D,r=new D){super(),this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=a,this.v3=r}getPoint(e,t=new D){let a=t,r=this.v0,i=this.v1,s=this.v2,l=this.v3;return a.set(Dl(e,r.x,i.x,s.x,l.x),Dl(e,r.y,i.y,s.y,l.y),Dl(e,r.z,i.z,s.z,l.z)),a}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}};Jc.prototype.isCubicBezierCurve3=!0;var ao=class extends _n{constructor(e=new le,t=new le){super(),this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new le){let a=t;return e===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(e).add(this.v1)),a}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t){let a=t||new le;return a.copy(this.v2).sub(this.v1).normalize(),a}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}};ao.prototype.isLineCurve=!0;var Mg=class extends _n{constructor(e=new D,t=new D){super(),this.type="LineCurve3",this.isLineCurve3=!0,this.v1=e,this.v2=t}getPoint(e,t=new D){let a=t;return e===1?a.copy(this.v2):(a.copy(this.v2).sub(this.v1),a.multiplyScalar(e).add(this.v1)),a}getPointAt(e,t){return this.getPoint(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xl=class extends _n{constructor(e=new le,t=new le,a=new le){super(),this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=a}getPoint(e,t=new le){let a=t,r=this.v0,i=this.v1,s=this.v2;return a.set(Pl(e,r.x,i.x,s.x),Pl(e,r.y,i.y,s.y)),a}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}};Xl.prototype.isQuadraticBezierCurve=!0;var Qc=class extends _n{constructor(e=new D,t=new D,a=new D){super(),this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=a}getPoint(e,t=new D){let a=t,r=this.v0,i=this.v1,s=this.v2;return a.set(Pl(e,r.x,i.x,s.x),Pl(e,r.y,i.y,s.y),Pl(e,r.z,i.z,s.z)),a}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}};Qc.prototype.isQuadraticBezierCurve3=!0;var Yl=class extends _n{constructor(e=[]){super(),this.type="SplineCurve",this.points=e}getPoint(e,t=new le){let a=t,r=this.points,i=(r.length-1)*e,s=Math.floor(i),l=i-s,u=r[s===0?s:s-1],d=r[s],f=r[s>r.length-2?r.length-1:s+1],p=r[s>r.length-3?r.length-1:s+2];return a.set(M1(l,u.x,d.x,f.x,p.x),M1(l,u.y,d.y,f.y,p.y)),a}copy(e){super.copy(e),this.points=[];for(let t=0,a=e.points.length;t<a;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,a=this.points.length;t<a;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,a=e.points.length;t<a;t++){let r=e.points[t];this.points.push(new le().fromArray(r))}return this}};Yl.prototype.isSplineCurve=!0;var fA=Object.freeze({__proto__:null,ArcCurve:Yc,CatmullRomCurve3:Zc,CubicBezierCurve:jl,CubicBezierCurve3:Jc,EllipseCurve:no,LineCurve:ao,LineCurve3:Mg,QuadraticBezierCurve:Xl,QuadraticBezierCurve3:Qc,SplineCurve:Yl}),_g=class extends _n{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);e.equals(t)||this.curves.push(new ao(t,e))}getPoint(e){let t=e*this.getLength(),a=this.getCurveLengths(),r=0;for(;r<a.length;){if(a[r]>=t){let i=a[r]-t,s=this.curves[r],l=s.getLength(),u=l===0?0:1-i/l;return s.getPointAt(u)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let a=0,r=this.curves.length;a<r;a++)t+=this.curves[a].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let a=0;a<=e;a++)t.push(this.getPoint(a/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],a;for(let r=0,i=this.curves;r<i.length;r++){let s=i[r],l=s&&s.isEllipseCurve?e*2:s&&(s.isLineCurve||s.isLineCurve3)?1:s&&s.isSplineCurve?e*s.points.length:e,u=s.getPoints(l);for(let d=0;d<u.length;d++){let f=u[d];a&&a.equals(f)||(t.push(f),a=f)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,a=e.curves.length;t<a;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,a=this.curves.length;t<a;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,a=e.curves.length;t<a;t++){let r=e.curves[t];this.curves.push(new fA[r.type]().fromJSON(r))}return this}},ro=class extends _g{constructor(e){super(),this.type="Path",this.currentPoint=new le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,a=e.length;t<a;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let a=new ao(this.currentPoint.clone(),new le(e,t));return this.curves.push(a),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,a,r){let i=new Xl(this.currentPoint.clone(),new le(e,t),new le(a,r));return this.curves.push(i),this.currentPoint.set(a,r),this}bezierCurveTo(e,t,a,r,i,s){let l=new jl(this.currentPoint.clone(),new le(e,t),new le(a,r),new le(i,s));return this.curves.push(l),this.currentPoint.set(i,s),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),a=new Yl(t);return this.curves.push(a),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,a,r,i,s){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absarc(e+l,t+u,a,r,i,s),this}absarc(e,t,a,r,i,s){return this.absellipse(e,t,a,a,r,i,s),this}ellipse(e,t,a,r,i,s,l,u){let d=this.currentPoint.x,f=this.currentPoint.y;return this.absellipse(e+d,t+f,a,r,i,s,l,u),this}absellipse(e,t,a,r,i,s,l,u){let d=new no(e,t,a,r,i,s,l,u);if(this.curves.length>0){let p=d.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(d);let f=d.getPoint(1);return this.currentPoint.copy(f),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},on=class extends ro{constructor(e){super(e),this.uuid=ca(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let a=0,r=this.holes.length;a<r;a++)t[a]=this.holes[a].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,a=e.holes.length;t<a;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,a=this.holes.length;t<a;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,a=e.holes.length;t<a;t++){let r=e.holes[t];this.holes.push(new ro().fromJSON(r))}return this}},jn=class extends Xe{constructor(e,t=1){super(),this.type="Light",this.color=new Ce(e),this.intensity=t}dispose(){}copy(e){return super.copy(e),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}};jn.prototype.isLight=!0;var Zl=class extends jn{constructor(e,t,a){super(e,a),this.type="HemisphereLight",this.position.copy(Xe.DefaultUp),this.updateMatrix(),this.groundColor=new Ce(t)}copy(e){return jn.prototype.copy.call(this,e),this.groundColor.copy(e.groundColor),this}};Zl.prototype.isHemisphereLight=!0;var _1=new Fe,L1=new D,C1=new D,Jl=class{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.mapSize=new le(512,512),this.map=null,this.mapPass=null,this.matrix=new Fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ys,this._frameExtents=new le(1,1),this._viewportCount=1,this._viewports=[new Ye(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,a=this.matrix;L1.setFromMatrixPosition(e.matrixWorld),t.position.copy(L1),C1.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(C1),t.updateMatrixWorld(),_1.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_1),a.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),a.multiply(t.projectionMatrix),a.multiply(t.matrixWorldInverse)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Kc=class extends Jl{constructor(){super(new Ft(50,1,.5,500)),this.focus=1}updateMatrices(e){let t=this.camera,a=Vm*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height,i=e.distance||t.far;(a!==t.fov||r!==t.aspect||i!==t.far)&&(t.fov=a,t.aspect=r,t.far=i,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}};Kc.prototype.isSpotLightShadow=!0;var Ql=class extends jn{constructor(e,t,a=0,r=Math.PI/3,i=0,s=1){super(e,t),this.type="SpotLight",this.position.copy(Xe.DefaultUp),this.updateMatrix(),this.target=new Xe,this.distance=a,this.angle=r,this.penumbra=i,this.decay=s,this.shadow=new Kc}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};Ql.prototype.isSpotLight=!0;var E1=new Fe,Cl=new D,Bm=new D,ef=class extends Jl{constructor(){super(new Ft(90,1,.5,500)),this._frameExtents=new le(4,2),this._viewportCount=6,this._viewports=[new Ye(2,1,1,1),new Ye(0,1,1,1),new Ye(3,1,1,1),new Ye(1,1,1,1),new Ye(3,0,1,1),new Ye(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(e,t=0){let a=this.camera,r=this.matrix,i=e.distance||a.far;i!==a.far&&(a.far=i,a.updateProjectionMatrix()),Cl.setFromMatrixPosition(e.matrixWorld),a.position.copy(Cl),Bm.copy(a.position),Bm.add(this._cubeDirections[t]),a.up.copy(this._cubeUps[t]),a.lookAt(Bm),a.updateMatrixWorld(),r.makeTranslation(-Cl.x,-Cl.y,-Cl.z),E1.multiplyMatrices(a.projectionMatrix,a.matrixWorldInverse),this._frustum.setFromProjectionMatrix(E1)}};ef.prototype.isPointLightShadow=!0;var Lg=class extends jn{constructor(e,t,a=0,r=1){super(e,t),this.type="PointLight",this.distance=a,this.decay=r,this.shadow=new ef}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}};Lg.prototype.isPointLight=!0;var Kl=class extends zl{constructor(e=-1,t=1,a=1,r=-1,i=.1,s=2e3){super(),this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=a,this.bottom=r,this.near=i,this.far=s,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,a,r,i,s){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=a,this.view.offsetY=r,this.view.width=i,this.view.height=s,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),a=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=a-e,s=a+e,l=r+t,u=r-t;if(this.view!==null&&this.view.enabled){let d=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=d*this.view.offsetX,s=i+d*this.view.width,l-=f*this.view.offsetY,u=l-f*this.view.height}this.projectionMatrix.makeOrthographic(i,s,l,u,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};Kl.prototype.isOrthographicCamera=!0;var tf=class extends Jl{constructor(){super(new Kl(-5,5,5,-5,.5,500))}};tf.prototype.isDirectionalLightShadow=!0;var io=class extends jn{constructor(e,t){super(e,t),this.type="DirectionalLight",this.position.copy(Xe.DefaultUp),this.updateMatrix(),this.target=new Xe,this.shadow=new tf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};io.prototype.isDirectionalLight=!0;var Cg=class extends jn{constructor(e,t){super(e,t),this.type="AmbientLight"}};Cg.prototype.isAmbientLight=!0;var Eg=class extends jn{constructor(e,t,a=10,r=10){super(e,t),this.type="RectAreaLight",this.width=a,this.height=r}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){let t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}};Eg.prototype.isRectAreaLight=!0;var nf=class{constructor(){this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new D)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){let a=e.x,r=e.y,i=e.z,s=this.coefficients;return t.copy(s[0]).multiplyScalar(.282095),t.addScaledVector(s[1],.488603*r),t.addScaledVector(s[2],.488603*i),t.addScaledVector(s[3],.488603*a),t.addScaledVector(s[4],1.092548*(a*r)),t.addScaledVector(s[5],1.092548*(r*i)),t.addScaledVector(s[6],.315392*(3*i*i-1)),t.addScaledVector(s[7],1.092548*(a*i)),t.addScaledVector(s[8],.546274*(a*a-r*r)),t}getIrradianceAt(e,t){let a=e.x,r=e.y,i=e.z,s=this.coefficients;return t.copy(s[0]).multiplyScalar(.886227),t.addScaledVector(s[1],2*.511664*r),t.addScaledVector(s[2],2*.511664*i),t.addScaledVector(s[3],2*.511664*a),t.addScaledVector(s[4],2*.429043*a*r),t.addScaledVector(s[5],2*.429043*r*i),t.addScaledVector(s[6],.743125*i*i-.247708),t.addScaledVector(s[7],2*.429043*a*i),t.addScaledVector(s[8],.429043*(a*a-r*r)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let a=0;a<9;a++)this.coefficients[a].addScaledVector(e.coefficients[a],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let a=0;a<9;a++)this.coefficients[a].lerp(e.coefficients[a],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){let a=this.coefficients;for(let r=0;r<9;r++)a[r].fromArray(e,t+r*3);return this}toArray(e=[],t=0){let a=this.coefficients;for(let r=0;r<9;r++)a[r].toArray(e,t+r*3);return e}static getBasisAt(e,t){let a=e.x,r=e.y,i=e.z;t[0]=.282095,t[1]=.488603*r,t[2]=.488603*i,t[3]=.488603*a,t[4]=1.092548*a*r,t[5]=1.092548*r*i,t[6]=.315392*(3*i*i-1),t[7]=1.092548*a*i,t[8]=.546274*(a*a-r*r)}};nf.prototype.isSphericalHarmonics3=!0;var eu=class extends jn{constructor(e=new nf,t=1){super(void 0,t),this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}fromJSON(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this}toJSON(e){let t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}};eu.prototype.isLightProbe=!0;var Ig=class{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let a=0,r=e.length;a<r;a++)t+=String.fromCharCode(e[a]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.substr(0,t+1)}},Tg=class extends et{constructor(){super(),this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}clone(){return new this.constructor().copy(this)}toJSON(){let e=super.toJSON(this);return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};Tg.prototype.isInstancedBufferGeometry=!0;var Ag=class extends vt{constructor(e,t,a,r){typeof a=="number"&&(r=a,a=!1,console.error("THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.")),super(e,t,a),this.meshPerAttribute=r||1}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}};Ag.prototype.isInstancedBufferAttribute=!0;var kg=class extends Ta{constructor(e){super(e),typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,a,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,s=to.get(e);if(s!==void 0)return i.manager.itemStart(e),setTimeout(function(){t&&t(s),i.manager.itemEnd(e)},0),s;let l={};l.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",l.headers=this.requestHeader,fetch(e,l).then(function(u){return u.blob()}).then(function(u){return createImageBitmap(u,Object.assign(i.options,{colorSpaceConversion:"none"}))}).then(function(u){to.add(e,u),t&&t(u),i.manager.itemEnd(e)}).catch(function(u){r&&r(u),i.manager.itemError(e),i.manager.itemEnd(e)}),i.manager.itemStart(e)}};kg.prototype.isImageBitmapLoader=!0;var Ng=class{constructor(){this.type="ShapePath",this.color=new Ce,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new ro,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,a,r){return this.currentPath.quadraticCurveTo(e,t,a,r),this}bezierCurveTo(e,t,a,r,i,s){return this.currentPath.bezierCurveTo(e,t,a,r,i,s),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e,t){function a(h){let y=[];for(let _=0,b=h.length;_<b;_++){let M=h[_],S=new on;S.curves=M.curves,y.push(S)}return y}function r(h,y){let _=y.length,b=!1;for(let M=_-1,S=0;S<_;M=S++){let k=y[M],E=y[S],B=E.x-k.x,$=E.y-k.y;if(Math.abs($)>Number.EPSILON){if($<0&&(k=y[S],B=-B,E=y[M],$=-$),h.y<k.y||h.y>E.y)continue;if(h.y===k.y){if(h.x===k.x)return!0}else{let G=$*(h.x-k.x)-B*(h.y-k.y);if(G===0)return!0;if(G<0)continue;b=!b}}else{if(h.y!==k.y)continue;if(E.x<=h.x&&h.x<=k.x||k.x<=h.x&&h.x<=E.x)return!0}}return b}let i=er.isClockWise,s=this.subPaths;if(s.length===0)return[];if(t===!0)return a(s);let l,u,d,f=[];if(s.length===1)return u=s[0],d=new on,d.curves=u.curves,f.push(d),f;let p=!i(s[0].getPoints());p=e?!p:p;let c=[],m=[],g=[],v=0,w;m[v]=void 0,g[v]=[];for(let h=0,y=s.length;h<y;h++)u=s[h],w=u.getPoints(),l=i(w),l=e?!l:l,l?(!p&&m[v]&&v++,m[v]={s:new on,p:w},m[v].s.curves=u.curves,p&&v++,g[v]=[]):g[v].push({h:u,p:w[0]});if(!m[0])return a(s);if(m.length>1){let h=!1,y=[];for(let _=0,b=m.length;_<b;_++)c[_]=[];for(let _=0,b=m.length;_<b;_++){let M=g[_];for(let S=0;S<M.length;S++){let k=M[S],E=!0;for(let B=0;B<m.length;B++)r(k.p,m[B].p)&&(_!==B&&y.push({froms:_,tos:B,hole:S}),E?(E=!1,c[B].push(k)):h=!0);E&&c[_].push(k)}}y.length>0&&(h||(g=c))}let x;for(let h=0,y=m.length;h<y;h++){d=m[h].s,f.push(d),x=g[h];for(let _=0,b=x.length;_<b;_++)d.holes.push(x[_].h)}return f}},Pg=class{constructor(e){this.type="Font",this.data=e}generateShapes(e,t=100){let a=[],r=pA(e,t,this.data);for(let i=0,s=r.length;i<s;i++)Array.prototype.push.apply(a,r[i].toShapes());return a}};function pA(n,e,t){let a=Array.from(n),r=e/t.resolution,i=(t.boundingBox.yMax-t.boundingBox.yMin+t.underlineThickness)*r,s=[],l=0,u=0;for(let d=0;d<a.length;d++){let f=a[d];if(f===`
`)l=0,u-=i;else{let p=hA(f,r,l,u,t);l+=p.offsetX,s.push(p.path)}}return s}function hA(n,e,t,a,r){let i=r.glyphs[n]||r.glyphs["?"];if(!i){console.error('THREE.Font: character "'+n+'" does not exists in font family '+r.familyName+".");return}let s=new Ng,l,u,d,f,p,c,m,g;if(i.o){let v=i._cachedOutline||(i._cachedOutline=i.o.split(" "));for(let w=0,x=v.length;w<x;)switch(v[w++]){case"m":l=v[w++]*e+t,u=v[w++]*e+a,s.moveTo(l,u);break;case"l":l=v[w++]*e+t,u=v[w++]*e+a,s.lineTo(l,u);break;case"q":d=v[w++]*e+t,f=v[w++]*e+a,p=v[w++]*e+t,c=v[w++]*e+a,s.quadraticCurveTo(p,c,d,f);break;case"b":d=v[w++]*e+t,f=v[w++]*e+a,p=v[w++]*e+t,c=v[w++]*e+a,m=v[w++]*e+t,g=v[w++]*e+a,s.bezierCurveTo(p,c,m,g,d,f);break}}return{offsetX:i.ha*e,path:s}}Pg.prototype.isFont=!0;var bc,mA={getContext:function(){return bc===void 0&&(bc=new(window.AudioContext||window.webkitAudioContext)),bc},setContext:function(n){bc=n}},Dg=class extends Ta{constructor(e){super(e)}load(e,t,a,r){let i=this,s=new bg(this.manager);s.setResponseType("arraybuffer"),s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,function(l){try{let u=l.slice(0);mA.getContext().decodeAudioData(u,function(f){t(f)})}catch(u){r?r(u):console.error(u),i.manager.itemError(e)}},a,r)}},Fg=class extends eu{constructor(e,t,a=1){super(void 0,a);let r=new Ce().set(e),i=new Ce().set(t),s=new D(r.r,r.g,r.b),l=new D(i.r,i.g,i.b),u=Math.sqrt(Math.PI),d=u*Math.sqrt(.75);this.sh.coefficients[0].copy(s).add(l).multiplyScalar(u),this.sh.coefficients[1].copy(s).sub(l).multiplyScalar(d)}};Fg.prototype.isHemisphereLightProbe=!0;var Bg=class extends eu{constructor(e,t=1){super(void 0,t);let a=new Ce().set(e);this.sh.coefficients[0].set(a.r,a.g,a.b).multiplyScalar(2*Math.sqrt(Math.PI))}};Bg.prototype.isAmbientLightProbe=!0;var af=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=I1(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=I1();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};function I1(){return(typeof performance>"u"?Date:performance).now()}var zg=class extends Xe{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;let t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source.stop(),this.source.onended=null,this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){if(this.detune=e,this.source.detune!==void 0)return this.isPlaying===!0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}};var Og=class{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0,t=this.getFrequencyData();for(let a=0;a<t.length;a++)e+=t[a];return e/t.length}},Hg=class{constructor(e,t,a){this.binding=e,this.valueSize=a;let r,i,s;switch(t){case"quaternion":r=this._slerp,i=this._slerpAdditive,s=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(a*6),this._workIndex=5;break;case"string":case"bool":r=this._select,i=this._select,s=this._setAdditiveIdentityOther,this.buffer=new Array(a*5);break;default:r=this._lerp,i=this._lerpAdditive,s=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(a*5)}this._mixBufferRegion=r,this._mixBufferRegionAdditive=i,this._setIdentity=s,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let a=this.buffer,r=this.valueSize,i=e*r+r,s=this.cumulativeWeight;if(s===0){for(let l=0;l!==r;++l)a[i+l]=a[l];s=t}else{s+=t;let l=t/s;this._mixBufferRegion(a,i,0,l,r)}this.cumulativeWeight=s}accumulateAdditive(e){let t=this.buffer,a=this.valueSize,r=a*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,r,0,e,a),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,a=this.buffer,r=e*t+t,i=this.cumulativeWeight,s=this.cumulativeWeightAdditive,l=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,i<1){let u=t*this._origIndex;this._mixBufferRegion(a,r,u,1-i,t)}s>0&&this._mixBufferRegionAdditive(a,r,this._addIndex*t,1,t);for(let u=t,d=t+t;u!==d;++u)if(a[u]!==a[u+t]){l.setValue(a,r);break}}saveOriginalState(){let e=this.binding,t=this.buffer,a=this.valueSize,r=a*this._origIndex;e.getValue(t,r);for(let i=a,s=r;i!==s;++i)t[i]=t[r+i%a];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let a=e;a<t;a++)this.buffer[a]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let a=0;a<this.valueSize;a++)this.buffer[t+a]=this.buffer[e+a]}_select(e,t,a,r,i){if(r>=.5)for(let s=0;s!==i;++s)e[t+s]=e[a+s]}_slerp(e,t,a,r){Gt.slerpFlat(e,t,e,t,e,a,r)}_slerpAdditive(e,t,a,r,i){let s=this._workIndex*i;Gt.multiplyQuaternionsFlat(e,s,e,t,e,a),Gt.slerpFlat(e,t,e,t,e,s,r)}_lerp(e,t,a,r,i){let s=1-r;for(let l=0;l!==i;++l){let u=t+l;e[u]=e[u]*s+e[a+l]*r}}_lerpAdditive(e,t,a,r,i){for(let s=0;s!==i;++s){let l=t+s;e[l]=e[l]+e[a+s]*r}}},i0="\\[\\]\\.:\\/",gA=new RegExp("["+i0+"]","g"),s0="[^"+i0+"]",xA="[^"+i0.replace("\\.","")+"]",vA=/((?:WC+[\/:])*)/.source.replace("WC",s0),yA=/(WCOD+)?/.source.replace("WCOD",xA),bA=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",s0),wA=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",s0),SA=new RegExp("^"+vA+yA+bA+wA+"$"),MA=["material","materials","bones"],Ug=class{constructor(e,t,a){let r=a||Ke.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let a=this._targetGroup.nCachedObjects_,r=this._bindings[a];r!==void 0&&r.getValue(e,t)}setValue(e,t){let a=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=a.length;r!==i;++r)a[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,a=e.length;t!==a;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,a=e.length;t!==a;++t)e[t].unbind()}},Ke=class n{constructor(e,t,a){this.path=t,this.parsedPath=a||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName)||e,this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,a){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,a):new n(e,t,a)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(gA,"")}static parseTrackName(e){let t=SA.exec(e);if(!t)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let a={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=a.nodeName&&a.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let i=a.nodeName.substring(r+1);MA.indexOf(i)!==-1&&(a.nodeName=a.nodeName.substring(0,r),a.objectName=i)}if(a.propertyName===null||a.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return a}static findNode(e,t){if(!t||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let a=e.skeleton.getBoneByName(t);if(a!==void 0)return a}if(e.children){let a=function(i){for(let s=0;s<i.length;s++){let l=i[s];if(l.name===t||l.uuid===t)return l;let u=a(l.children);if(u)return u}return null},r=a(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.node[this.propertyName]}_getValue_array(e,t){let a=this.resolvedProperty;for(let r=0,i=a.length;r!==i;++r)e[t++]=a[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let a=this.resolvedProperty;for(let r=0,i=a.length;r!==i;++r)a[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let a=this.resolvedProperty;for(let r=0,i=a.length;r!==i;++r)a[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let a=this.resolvedProperty;for(let r=0,i=a.length;r!==i;++r)a[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,a=t.objectName,r=t.propertyName,i=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName)||this.rootNode,this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");return}if(a){let d=t.objectIndex;switch(a){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let f=0;f<e.length;f++)if(e[f].name===d){d=f;break}break;default:if(e[a]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[a]}if(d!==void 0){if(e[d]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[d]}}let s=e[r];if(s===void 0){let d=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+d+"."+r+" but it wasn't found.",e);return}let l=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?l=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(l=this.Versioning.MatrixWorldNeedsUpdate);let u=this.BindingType.Direct;if(i!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(e.geometry.isBufferGeometry){if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[i]!==void 0&&(i=e.morphTargetDictionary[i])}else{console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences on THREE.Geometry. Use THREE.BufferGeometry instead.",this);return}}u=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=i}else s.fromArray!==void 0&&s.toArray!==void 0?(u=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(u=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=r;this.getValue=this.GetterByBindingType[u],this.setValue=this.SetterByBindingTypeAndVersioning[u][l]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ke.Composite=Ug;Ke.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ke.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ke.prototype.GetterByBindingType=[Ke.prototype._getValue_direct,Ke.prototype._getValue_array,Ke.prototype._getValue_arrayElement,Ke.prototype._getValue_toArray];Ke.prototype.SetterByBindingTypeAndVersioning=[[Ke.prototype._setValue_direct,Ke.prototype._setValue_direct_setNeedsUpdate,Ke.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ke.prototype._setValue_array,Ke.prototype._setValue_array_setNeedsUpdate,Ke.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ke.prototype._setValue_arrayElement,Ke.prototype._setValue_arrayElement_setNeedsUpdate,Ke.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ke.prototype._setValue_fromArray,Ke.prototype._setValue_fromArray_setNeedsUpdate,Ke.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Rg=class{constructor(){this.uuid=ca(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;let e={};this._indicesByUUID=e;for(let a=0,r=arguments.length;a!==r;++a)e[arguments[a].uuid]=a;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};let t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){let e=this._objects,t=this._indicesByUUID,a=this._paths,r=this._parsedPaths,i=this._bindings,s=i.length,l,u=e.length,d=this.nCachedObjects_;for(let f=0,p=arguments.length;f!==p;++f){let c=arguments[f],m=c.uuid,g=t[m];if(g===void 0){g=u++,t[m]=g,e.push(c);for(let v=0,w=s;v!==w;++v)i[v].push(new Ke(c,a[v],r[v]))}else if(g<d){l=e[g];let v=--d,w=e[v];t[w.uuid]=g,e[g]=w,t[m]=v,e[v]=c;for(let x=0,h=s;x!==h;++x){let y=i[x],_=y[v],b=y[g];y[g]=_,b===void 0&&(b=new Ke(c,a[x],r[x])),y[v]=b}}else e[g]!==l&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=d}remove(){let e=this._objects,t=this._indicesByUUID,a=this._bindings,r=a.length,i=this.nCachedObjects_;for(let s=0,l=arguments.length;s!==l;++s){let u=arguments[s],d=u.uuid,f=t[d];if(f!==void 0&&f>=i){let p=i++,c=e[p];t[c.uuid]=f,e[f]=c,t[d]=p,e[p]=u;for(let m=0,g=r;m!==g;++m){let v=a[m],w=v[p],x=v[f];v[f]=w,v[p]=x}}}this.nCachedObjects_=i}uncache(){let e=this._objects,t=this._indicesByUUID,a=this._bindings,r=a.length,i=this.nCachedObjects_,s=e.length;for(let l=0,u=arguments.length;l!==u;++l){let d=arguments[l],f=d.uuid,p=t[f];if(p!==void 0)if(delete t[f],p<i){let c=--i,m=e[c],g=--s,v=e[g];t[m.uuid]=p,e[p]=m,t[v.uuid]=c,e[c]=v,e.pop();for(let w=0,x=r;w!==x;++w){let h=a[w],y=h[c],_=h[g];h[p]=y,h[c]=_,h.pop()}}else{let c=--s,m=e[c];c>0&&(t[m.uuid]=p),e[p]=m,e.pop();for(let g=0,v=r;g!==v;++g){let w=a[g];w[p]=w[c],w.pop()}}}this.nCachedObjects_=i}subscribe_(e,t){let a=this._bindingsIndicesByPath,r=a[e],i=this._bindings;if(r!==void 0)return i[r];let s=this._paths,l=this._parsedPaths,u=this._objects,d=u.length,f=this.nCachedObjects_,p=new Array(d);r=i.length,a[e]=r,s.push(e),l.push(t),i.push(p);for(let c=f,m=u.length;c!==m;++c){let g=u[c];p[c]=new Ke(g,e,t)}return p}unsubscribe_(e){let t=this._bindingsIndicesByPath,a=t[e];if(a!==void 0){let r=this._paths,i=this._parsedPaths,s=this._bindings,l=s.length-1,u=s[l],d=e[l];t[d]=a,s[a]=u,s.pop(),i[a]=i[l],i.pop(),r[a]=r[l],r.pop()}}};Rg.prototype.isAnimationObjectGroup=!0;var Gg=class{constructor(e,t,a=null,r=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=a,this.blendMode=r;let i=t.tracks,s=i.length,l=new Array(s),u={endingStart:Rs,endingEnd:Rs};for(let d=0;d!==s;++d){let f=i[d].createInterpolant(null);l[d]=f,f.settings=u}this._interpolantSettings=u,this._interpolants=l,this._propertyBindings=new Array(s),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=nL,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,a){if(e.fadeOut(t),this.fadeIn(t),a){let r=this._clip.duration,i=e._clip.duration,s=i/r,l=r/i;e.warp(1,s,t),this.warp(l,1,t)}return this}crossFadeTo(e,t,a){return e.crossFadeFrom(this,t,a)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,a){let r=this._mixer,i=r.time,s=this.timeScale,l=this._timeScaleInterpolant;l===null&&(l=r._lendControlInterpolant(),this._timeScaleInterpolant=l);let u=l.parameterPositions,d=l.sampleValues;return u[0]=i,u[1]=i+a,d[0]=e/s,d[1]=t/s,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,a,r){if(!this.enabled){this._updateWeight(e);return}let i=this._startTime;if(i!==null){let u=(e-i)*a;if(u<0||a===0)return;this._startTime=null,t=a*u}t*=this._updateTimeScale(e);let s=this._updateTime(t),l=this._updateWeight(e);if(l>0){let u=this._interpolants,d=this._propertyBindings;switch(this.blendMode){case V1:for(let f=0,p=u.length;f!==p;++f)u[f].evaluate(s),d[f].accumulateAdditive(l);break;case t0:default:for(let f=0,p=u.length;f!==p;++f)u[f].evaluate(s),d[f].accumulate(r,l)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let a=this._weightInterpolant;if(a!==null){let r=a.evaluate(e)[0];t*=r,e>a.parameterPositions[1]&&(this.stopFading(),r===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let a=this._timeScaleInterpolant;if(a!==null){let r=a.evaluate(e)[0];t*=r,e>a.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,a=this.loop,r=this.time+e,i=this._loopCount,s=a===aL;if(e===0)return i===-1?r:s&&(i&1)===1?t-r:r;if(a===tL){i===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(r>=t)r=t;else if(r<0)r=0;else{this.time=r;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(i===-1&&(e>=0?(i=0,this._setEndings(!0,this.repetitions===0,s)):this._setEndings(this.repetitions===0,!0,s)),r>=t||r<0){let l=Math.floor(r/t);r-=t*l,i+=Math.abs(l);let u=this.repetitions-i;if(u<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,r=e>0?t:0,this.time=r,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(u===1){let d=e<0;this._setEndings(d,!d,s)}else this._setEndings(!1,!1,s);this._loopCount=i,this.time=r,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:l})}}else this.time=r;if(s&&(i&1)===1)return t-r}return r}_setEndings(e,t,a){let r=this._interpolantSettings;a?(r.endingStart=Gs,r.endingEnd=Gs):(e?r.endingStart=this.zeroSlopeAtStart?Gs:Rs:r.endingStart=kc,t?r.endingEnd=this.zeroSlopeAtEnd?Gs:Rs:r.endingEnd=kc)}_scheduleFading(e,t,a){let r=this._mixer,i=r.time,s=this._weightInterpolant;s===null&&(s=r._lendControlInterpolant(),this._weightInterpolant=s);let l=s.parameterPositions,u=s.sampleValues;return l[0]=i,u[0]=t,l[1]=i+e,u[1]=a,this}},Vg=class extends tr{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let a=e._localRoot||this._root,r=e._clip.tracks,i=r.length,s=e._propertyBindings,l=e._interpolants,u=a.uuid,d=this._bindingsByRootAndName,f=d[u];f===void 0&&(f={},d[u]=f);for(let p=0;p!==i;++p){let c=r[p],m=c.name,g=f[m];if(g!==void 0)s[p]=g;else{if(g=s[p],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,u,m));continue}let v=t&&t._propertyBindings[p].binding.parsedPath;g=new Hg(Ke.create(a,m,v),c.ValueTypeName,c.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,u,m),s[p]=g}l[p].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let a=(e._localRoot||this._root).uuid,r=e._clip.uuid,i=this._actionsByClip[r];this._bindAction(e,i&&i.knownActions[0]),this._addInactiveAction(e,r,a)}let t=e._propertyBindings;for(let a=0,r=t.length;a!==r;++a){let i=t[a];i.useCount++===0&&(this._lendBinding(i),i.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let a=0,r=t.length;a!==r;++a){let i=t[a];--i.useCount===0&&(i.restoreOriginalState(),this._takeBackBinding(i))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,a){let r=this._actions,i=this._actionsByClip,s=i[t];if(s===void 0)s={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,i[t]=s;else{let l=s.knownActions;e._byClipCacheIndex=l.length,l.push(e)}e._cacheIndex=r.length,r.push(e),s.actionByRoot[a]=e}_removeInactiveAction(e){let t=this._actions,a=t[t.length-1],r=e._cacheIndex;a._cacheIndex=r,t[r]=a,t.pop(),e._cacheIndex=null;let i=e._clip.uuid,s=this._actionsByClip,l=s[i],u=l.knownActions,d=u[u.length-1],f=e._byClipCacheIndex;d._byClipCacheIndex=f,u[f]=d,u.pop(),e._byClipCacheIndex=null;let p=l.actionByRoot,c=(e._localRoot||this._root).uuid;delete p[c],u.length===0&&delete s[i],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let a=0,r=t.length;a!==r;++a){let i=t[a];--i.referenceCount===0&&this._removeInactiveBinding(i)}}_lendAction(e){let t=this._actions,a=e._cacheIndex,r=this._nActiveActions++,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=a,t[a]=i}_takeBackAction(e){let t=this._actions,a=e._cacheIndex,r=--this._nActiveActions,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=a,t[a]=i}_addInactiveBinding(e,t,a){let r=this._bindingsByRootAndName,i=this._bindings,s=r[t];s===void 0&&(s={},r[t]=s),s[a]=e,e._cacheIndex=i.length,i.push(e)}_removeInactiveBinding(e){let t=this._bindings,a=e.binding,r=a.rootNode.uuid,i=a.path,s=this._bindingsByRootAndName,l=s[r],u=t[t.length-1],d=e._cacheIndex;u._cacheIndex=d,t[d]=u,t.pop(),delete l[i],Object.keys(l).length===0&&delete s[r]}_lendBinding(e){let t=this._bindings,a=e._cacheIndex,r=this._nActiveBindings++,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=a,t[a]=i}_takeBackBinding(e){let t=this._bindings,a=e._cacheIndex,r=--this._nActiveBindings,i=t[r];e._cacheIndex=r,t[r]=e,i._cacheIndex=a,t[a]=i}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,a=e[t];return a===void 0&&(a=new qc(new Float32Array(2),new Float32Array(2),1,this._controlInterpolantsResultBuffer),a.__cacheIndex=t,e[t]=a),a}_takeBackControlInterpolant(e){let t=this._controlInterpolants,a=e.__cacheIndex,r=--this._nActiveControlInterpolants,i=t[r];e.__cacheIndex=r,t[r]=e,i.__cacheIndex=a,t[a]=i}clipAction(e,t,a){let r=t||this._root,i=r.uuid,s=typeof e=="string"?jc.findByName(r,e):e,l=s!==null?s.uuid:e,u=this._actionsByClip[l],d=null;if(a===void 0&&(s!==null?a=s.blendMode:a=t0),u!==void 0){let p=u.actionByRoot[i];if(p!==void 0&&p.blendMode===a)return p;d=u.knownActions[0],s===null&&(s=d._clip)}if(s===null)return null;let f=new Gg(this,s,t,a);return this._bindAction(f,d),this._addInactiveAction(f,l,i),f}existingAction(e,t){let a=t||this._root,r=a.uuid,i=typeof e=="string"?jc.findByName(a,e):e,s=i?i.uuid:e,l=this._actionsByClip[s];return l!==void 0&&l.actionByRoot[r]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let a=t-1;a>=0;--a)e[a].stop();return this}update(e){e*=this.timeScale;let t=this._actions,a=this._nActiveActions,r=this.time+=e,i=Math.sign(e),s=this._accuIndex^=1;for(let d=0;d!==a;++d)t[d]._update(r,e,i,s);let l=this._bindings,u=this._nActiveBindings;for(let d=0;d!==u;++d)l[d].apply(s);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,a=e.uuid,r=this._actionsByClip,i=r[a];if(i!==void 0){let s=i.knownActions;for(let l=0,u=s.length;l!==u;++l){let d=s[l];this._deactivateAction(d);let f=d._cacheIndex,p=t[t.length-1];d._cacheIndex=null,d._byClipCacheIndex=null,p._cacheIndex=f,t[f]=p,t.pop(),this._removeInactiveBindingsForAction(d)}delete r[a]}}uncacheRoot(e){let t=e.uuid,a=this._actionsByClip;for(let s in a){let l=a[s].actionByRoot,u=l[t];u!==void 0&&(this._deactivateAction(u),this._removeInactiveAction(u))}let r=this._bindingsByRootAndName,i=r[t];if(i!==void 0)for(let s in i){let l=i[s];l.restoreOriginalState(),this._removeInactiveBinding(l)}}uncacheAction(e,t){let a=this.existingAction(e,t);a!==null&&(this._deactivateAction(a),this._removeInactiveAction(a))}};Vg.prototype._controlInterpolantsResultBuffer=new Float32Array(1);var Wg=class n{constructor(e){typeof e=="string"&&(console.warn("THREE.Uniform: Type parameter is no longer needed."),e=arguments[1]),this.value=e}clone(){return new n(this.value.clone===void 0?this.value:this.value.clone())}},qg=class extends Ni{constructor(e,t,a=1){super(e,t),this.meshPerAttribute=a||1}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}};qg.prototype.isInstancedInterleavedBuffer=!0;var $g=class{constructor(e,t,a,r,i){this.buffer=e,this.type=t,this.itemSize=a,this.elementSize=r,this.count=i,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}};$g.prototype.isGLBufferAttribute=!0;var T1=new le,Fi=class{constructor(e=new le(1/0,1/0),t=new le(-1/0,-1/0)){this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,a=e.length;t<a;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let a=T1.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(a),this.max.copy(e).add(a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return e===void 0&&(console.warn("THREE.Box2: .getCenter() target is now required"),e=new le),this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return e===void 0&&(console.warn("THREE.Box2: .getSize() target is now required"),e=new le),this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t===void 0&&(console.warn("THREE.Box2: .getParameter() target is now required"),t=new le),t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y)}clampPoint(e,t){return t===void 0&&(console.warn("THREE.Box2: .clampPoint() target is now required"),t=new le),t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return T1.copy(e).clamp(this.min,this.max).sub(e).length()}intersect(e){return this.min.max(e.min),this.max.min(e.max),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}};Fi.prototype.isBox2=!0;var A1=new D,wc=new D,jg=class{constructor(e=new D,t=new D){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e===void 0&&(console.warn("THREE.Line3: .getCenter() target is now required"),e=new D),e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e===void 0&&(console.warn("THREE.Line3: .delta() target is now required"),e=new D),e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return t===void 0&&(console.warn("THREE.Line3: .at() target is now required"),t=new D),this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){A1.subVectors(e,this.start),wc.subVectors(this.end,this.start);let a=wc.dot(wc),i=wc.dot(A1)/a;return t&&(i=wn(i,0,1)),i}closestPointToPoint(e,t,a){let r=this.closestPointToPointParameter(e,t);return a===void 0&&(console.warn("THREE.Line3: .closestPointToPoint() target is now required"),a=new D),this.delta(a).multiplyScalar(r).add(this.start)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}},Xg=class extends Xe{constructor(e){super(),this.material=e,this.render=function(){},this.hasPositions=!1,this.hasNormals=!1,this.hasColors=!1,this.hasUvs=!1,this.positionArray=null,this.normalArray=null,this.colorArray=null,this.uvArray=null,this.count=0}};Xg.prototype.isImmediateRenderObject=!0;var Or=new D,Sc=new Fe,zm=new Fe,Yg=class extends Gl{constructor(e){let t=lw(e),a=new et,r=[],i=[],s=new Ce(0,0,1),l=new Ce(0,1,0);for(let d=0;d<t.length;d++){let f=t[d];f.parent&&f.parent.isBone&&(r.push(0,0,0),r.push(0,0,0),i.push(s.r,s.g,s.b),i.push(l.r,l.g,l.b))}a.setAttribute("position",new it(r,3)),a.setAttribute("color",new it(i,3));let u=new Pi({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(a,u),this.type="SkeletonHelper",this.isSkeletonHelper=!0,this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1}updateMatrixWorld(e){let t=this.bones,a=this.geometry,r=a.getAttribute("position");zm.copy(this.root.matrixWorld).invert();for(let i=0,s=0;i<t.length;i++){let l=t[i];l.parent&&l.parent.isBone&&(Sc.multiplyMatrices(zm,l.matrixWorld),Or.setFromMatrixPosition(Sc),r.setXYZ(s,Or.x,Or.y,Or.z),Sc.multiplyMatrices(zm,l.parent.matrixWorld),Or.setFromMatrixPosition(Sc),r.setXYZ(s+1,Or.x,Or.y,Or.z),s+=2)}a.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}};function lw(n){let e=[];n&&n.isBone&&e.push(n);for(let t=0;t<n.children.length;t++)e.push.apply(e,lw(n.children[t]));return e}var Zg=class extends Gl{constructor(e=10,t=10,a=4473924,r=8947848){a=new Ce(a),r=new Ce(r);let i=t/2,s=e/t,l=e/2,u=[],d=[];for(let c=0,m=0,g=-l;c<=t;c++,g+=s){u.push(-l,0,g,l,0,g),u.push(g,0,-l,g,0,l);let v=c===i?a:r;v.toArray(d,m),m+=3,v.toArray(d,m),m+=3,v.toArray(d,m),m+=3,v.toArray(d,m),m+=3}let f=new et;f.setAttribute("position",new it(u,3)),f.setAttribute("color",new it(d,3));let p=new Pi({vertexColors:!0,toneMapped:!1});super(f,p),this.type="GridHelper"}};var _A=new Float32Array(1),P3=new Int32Array(_A.buffer);var $s=4,Gr=8,_a=Math.pow(2,Gr),uw=[.125,.215,.35,.446,.526,.582],dw=Gr-$s+1+uw.length,Os=20,Ca={[Sn]:0,[Aa]:1,[a0]:2,[W1]:3,[q1]:4,[$1]:5,[n0]:6},Ii=new $r({side:Dt,depthWrite:!1,depthTest:!1}),LA=new Le(new Ge,Ii),Om=new Kl,{_lodPlanes:El,_sizeLods:k1,_sigmas:Mc}=EA(),N1=new Ce,Hm=null,Ti=(1+Math.sqrt(5))/2,Hs=1/Ti,P1=[new D(1,1,1),new D(-1,1,1),new D(1,1,-1),new D(-1,1,-1),new D(0,Ti,Hs),new D(0,Ti,-Hs),new D(Hs,0,Ti),new D(-Hs,0,Ti),new D(Ti,Hs,0),new D(-Ti,Hs,0)];function D1(n){let e=Math.max(n.r,n.g,n.b),t=Math.min(Math.max(Math.ceil(Math.log2(e)),-128),127);return n.multiplyScalar(Math.pow(2,-t)),(t+128)/255}var rf=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._blurMaterial=IA(Os),this._equirectShader=null,this._cubemapShader=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,a=.1,r=100){Hm=this._renderer.getRenderTarget();let i=this._allocateTargets();return this._sceneToCubeUV(e,a,r,i),t>0&&this._blur(i,0,0,t),this._applyPMREM(i),this._cleanup(i),i}fromEquirectangular(e){return this._fromTexture(e)}fromCubemap(e){return this._fromTexture(e)}compileCubemapShader(){this._cubemapShader===null&&(this._cubemapShader=z1(),this._compileMaterial(this._cubemapShader))}compileEquirectangularShader(){this._equirectShader===null&&(this._equirectShader=B1(),this._compileMaterial(this._equirectShader))}dispose(){this._blurMaterial.dispose(),this._cubemapShader!==null&&this._cubemapShader.dispose(),this._equirectShader!==null&&this._equirectShader.dispose();for(let e=0;e<El.length;e++)El[e].dispose()}_cleanup(e){this._pingPongRenderTarget.dispose(),this._renderer.setRenderTarget(Hm),e.scissorTest=!1,_c(e,0,0,e.width,e.height)}_fromTexture(e){Hm=this._renderer.getRenderTarget();let t=this._allocateTargets(e);return this._textureToCubeUV(e,t),this._applyPMREM(t),this._cleanup(t),t}_allocateTargets(e){let t={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:tu,format:v_,encoding:CA(e)?e.encoding:a0,depthBuffer:!1},a=F1(t);return a.depthBuffer=!e,this._pingPongRenderTarget=F1(t),a}_compileMaterial(e){let t=new Le(El[0],e);this._renderer.compile(t,Om)}_sceneToCubeUV(e,t,a,r){let l=new Ft(90,1,t,a),u=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],f=this._renderer,p=f.autoClear,c=f.outputEncoding,m=f.toneMapping;f.getClearColor(N1),f.toneMapping=Ws,f.outputEncoding=Sn,f.autoClear=!1;let g=!1,v=e.background;if(v){if(v.isColor){Ii.color.copy(v).convertSRGBToLinear(),e.background=null;let w=D1(Ii.color);Ii.opacity=w,g=!0}}else{Ii.color.copy(N1).convertSRGBToLinear();let w=D1(Ii.color);Ii.opacity=w,g=!0}for(let w=0;w<6;w++){let x=w%3;x==0?(l.up.set(0,u[w],0),l.lookAt(d[w],0,0)):x==1?(l.up.set(0,0,u[w]),l.lookAt(0,d[w],0)):(l.up.set(0,u[w],0),l.lookAt(0,0,d[w])),_c(r,x*_a,w>2?_a:0,_a,_a),f.setRenderTarget(r),g&&f.render(LA,l),f.render(e,l)}f.toneMapping=m,f.outputEncoding=c,f.autoClear=p}_textureToCubeUV(e,t){let a=this._renderer;e.isCubeTexture?this._cubemapShader==null&&(this._cubemapShader=z1()):this._equirectShader==null&&(this._equirectShader=B1());let r=e.isCubeTexture?this._cubemapShader:this._equirectShader,i=new Le(El[0],r),s=r.uniforms;s.envMap.value=e,e.isCubeTexture||s.texelSize.value.set(1/e.image.width,1/e.image.height),s.inputEncoding.value=Ca[e.encoding],s.outputEncoding.value=Ca[t.texture.encoding],_c(t,0,0,3*_a,2*_a),a.setRenderTarget(t),a.render(i,Om)}_applyPMREM(e){let t=this._renderer,a=t.autoClear;t.autoClear=!1;for(let r=1;r<dw;r++){let i=Math.sqrt(Mc[r]*Mc[r]-Mc[r-1]*Mc[r-1]),s=P1[(r-1)%P1.length];this._blur(e,r-1,r,i,s)}t.autoClear=a}_blur(e,t,a,r,i){let s=this._pingPongRenderTarget;this._halfBlur(e,s,t,a,r,"latitudinal",i),this._halfBlur(s,e,a,a,r,"longitudinal",i)}_halfBlur(e,t,a,r,i,s,l){let u=this._renderer,d=this._blurMaterial;s!=="latitudinal"&&s!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let f=3,p=new Le(El[r],d),c=d.uniforms,m=k1[a]-1,g=isFinite(i)?Math.PI/(2*m):2*Math.PI/(2*Os-1),v=i/g,w=isFinite(i)?1+Math.floor(f*v):Os;w>Os&&console.warn(`sigmaRadians, ${i}, is too large and will clip, as it requested ${w} samples when the maximum is set to ${Os}`);let x=[],h=0;for(let M=0;M<Os;++M){let S=M/v,k=Math.exp(-S*S/2);x.push(k),M==0?h+=k:M<w&&(h+=2*k)}for(let M=0;M<x.length;M++)x[M]=x[M]/h;c.envMap.value=e.texture,c.samples.value=w,c.weights.value=x,c.latitudinal.value=s==="latitudinal",l&&(c.poleAxis.value=l),c.dTheta.value=g,c.mipInt.value=Gr-a,c.inputEncoding.value=Ca[e.texture.encoding],c.outputEncoding.value=Ca[e.texture.encoding];let y=k1[r],_=3*Math.max(0,_a-2*y),b=(r===0?0:2*_a)+2*y*(r>Gr-$s?r-Gr+$s:0);_c(t,_,b,3*y,2*y),u.setRenderTarget(t),u.render(p,Om)}};function CA(n){return n===void 0||n.type!==tu?!1:n.encoding===Sn||n.encoding===Aa||n.encoding===n0}function EA(){let n=[],e=[],t=[],a=Gr;for(let r=0;r<dw;r++){let i=Math.pow(2,a);e.push(i);let s=1/i;r>Gr-$s?s=uw[r-Gr+$s-1]:r==0&&(s=0),t.push(s);let l=1/(i-1),u=-l/2,d=1+l/2,f=[u,u,d,u,d,d,u,u,d,d,u,d],p=6,c=6,m=3,g=2,v=1,w=new Float32Array(m*c*p),x=new Float32Array(g*c*p),h=new Float32Array(v*c*p);for(let _=0;_<p;_++){let b=_%3*2/3-1,M=_>2?0:-1,S=[b,M,0,b+2/3,M,0,b+2/3,M+1,0,b,M,0,b+2/3,M+1,0,b,M+1,0];w.set(S,m*c*_),x.set(f,g*c*_);let k=[_,_,_,_,_,_];h.set(k,v*c*_)}let y=new et;y.setAttribute("position",new vt(w,m)),y.setAttribute("uv",new vt(x,g)),y.setAttribute("faceIndex",new vt(h,v)),n.push(y),a>$s&&a--}return{_lodPlanes:n,_sizeLods:e,_sigmas:t}}function F1(n){let e=new Ea(3*_a,3*_a,n);return e.texture.mapping=df,e.texture.name="PMREM.cubeUv",e.scissorTest=!0,e}function _c(n,e,t,a,r){n.viewport.set(e,t,a,r),n.scissor.set(e,t,a,r)}function IA(n){let e=new Float32Array(n),t=new D(0,1,0);return new Qs({name:"SphericalGaussianBlur",defines:{n},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:e},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:t},inputEncoding:{value:Ca[Sn]},outputEncoding:{value:Ca[Sn]}},vertexShader:o0(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			${l0()}

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

				gl_FragColor = linearToOutputTexel( gl_FragColor );

			}
		`,blending:Ur,depthTest:!1,depthWrite:!1})}function B1(){let n=new le(1,1);return new Qs({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null},texelSize:{value:n},inputEncoding:{value:Ca[Sn]},outputEncoding:{value:Ca[Sn]}},vertexShader:o0(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform vec2 texelSize;

			${l0()}

			#include <common>

			void main() {

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				vec2 f = fract( uv / texelSize - 0.5 );
				uv -= f * texelSize;
				vec3 tl = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;
				uv.x += texelSize.x;
				vec3 tr = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;
				uv.y += texelSize.y;
				vec3 br = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;
				uv.x -= texelSize.x;
				vec3 bl = envMapTexelToLinear( texture2D ( envMap, uv ) ).rgb;

				vec3 tm = mix( tl, tr, f.x );
				vec3 bm = mix( bl, br, f.x );
				gl_FragColor.rgb = mix( tm, bm, f.y );

				gl_FragColor = linearToOutputTexel( gl_FragColor );

			}
		`,blending:Ur,depthTest:!1,depthWrite:!1})}function z1(){return new Qs({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},inputEncoding:{value:Ca[Sn]},outputEncoding:{value:Ca[Sn]}},vertexShader:o0(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			${l0()}

			void main() {

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb = envMapTexelToLinear( textureCube( envMap, vec3( - vOutputDirection.x, vOutputDirection.yz ) ) ).rgb;
				gl_FragColor = linearToOutputTexel( gl_FragColor );

			}
		`,blending:Ur,depthTest:!1,depthWrite:!1})}function o0(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 position;
		attribute vec2 uv;
		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function l0(){return`

		uniform int inputEncoding;
		uniform int outputEncoding;

		#include <encodings_pars_fragment>

		vec4 inputTexelToLinear( vec4 value ) {

			if ( inputEncoding == 0 ) {

				return value;

			} else if ( inputEncoding == 1 ) {

				return sRGBToLinear( value );

			} else if ( inputEncoding == 2 ) {

				return RGBEToLinear( value );

			} else if ( inputEncoding == 3 ) {

				return RGBMToLinear( value, 7.0 );

			} else if ( inputEncoding == 4 ) {

				return RGBMToLinear( value, 16.0 );

			} else if ( inputEncoding == 5 ) {

				return RGBDToLinear( value, 256.0 );

			} else {

				return GammaToLinear( value, 2.2 );

			}

		}

		vec4 linearToOutputTexel( vec4 value ) {

			if ( outputEncoding == 0 ) {

				return value;

			} else if ( outputEncoding == 1 ) {

				return LinearTosRGB( value );

			} else if ( outputEncoding == 2 ) {

				return LinearToRGBE( value );

			} else if ( outputEncoding == 3 ) {

				return LinearToRGBM( value, 7.0 );

			} else if ( outputEncoding == 4 ) {

				return LinearToRGBM( value, 16.0 );

			} else if ( outputEncoding == 5 ) {

				return LinearToRGBD( value, 256.0 );

			} else {

				return LinearToGamma( value, 2.2 );

			}

		}

		vec4 envMapTexelToLinear( vec4 color ) {

			return inputTexelToLinear( color );

		}
	`}_n.create=function(n,e){return console.log("THREE.Curve.create() has been deprecated"),n.prototype=Object.create(_n.prototype),n.prototype.constructor=n,n.prototype.getPoint=e,n};ro.prototype.fromPoints=function(n){return console.warn("THREE.Path: .fromPoints() has been renamed to .setFromPoints()."),this.setFromPoints(n)};Zg.prototype.setColors=function(){console.error("THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.")};Yg.prototype.update=function(){console.error("THREE.SkeletonHelper: update() no longer needs to be called.")};Ta.prototype.extractUrlBase=function(n){return console.warn("THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead."),Ig.extractUrlBase(n)};Ta.Handlers={add:function(){console.error("THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead.")},get:function(){console.error("THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead.")}};Fi.prototype.center=function(n){return console.warn("THREE.Box2: .center() has been renamed to .getCenter()."),this.getCenter(n)};Fi.prototype.empty=function(){return console.warn("THREE.Box2: .empty() has been renamed to .isEmpty()."),this.isEmpty()};Fi.prototype.isIntersectionBox=function(n){return console.warn("THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(n)};Fi.prototype.size=function(n){return console.warn("THREE.Box2: .size() has been renamed to .getSize()."),this.getSize(n)};Mn.prototype.center=function(n){return console.warn("THREE.Box3: .center() has been renamed to .getCenter()."),this.getCenter(n)};Mn.prototype.empty=function(){return console.warn("THREE.Box3: .empty() has been renamed to .isEmpty()."),this.isEmpty()};Mn.prototype.isIntersectionBox=function(n){return console.warn("THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(n)};Mn.prototype.isIntersectionSphere=function(n){return console.warn("THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(n)};Mn.prototype.size=function(n){return console.warn("THREE.Box3: .size() has been renamed to .getSize()."),this.getSize(n)};Wr.prototype.empty=function(){return console.warn("THREE.Sphere: .empty() has been renamed to .isEmpty()."),this.isEmpty()};Ys.prototype.setFromMatrix=function(n){return console.warn("THREE.Frustum: .setFromMatrix() has been renamed to .setFromProjectionMatrix()."),this.setFromProjectionMatrix(n)};jg.prototype.center=function(n){return console.warn("THREE.Line3: .center() has been renamed to .getCenter()."),this.getCenter(n)};At.prototype.flattenToArrayOffset=function(n,e){return console.warn("THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(n,e)};At.prototype.multiplyVector3=function(n){return console.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."),n.applyMatrix3(this)};At.prototype.multiplyVector3Array=function(){console.error("THREE.Matrix3: .multiplyVector3Array() has been removed.")};At.prototype.applyToBufferAttribute=function(n){return console.warn("THREE.Matrix3: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix3( matrix ) instead."),n.applyMatrix3(this)};At.prototype.applyToVector3Array=function(){console.error("THREE.Matrix3: .applyToVector3Array() has been removed.")};At.prototype.getInverse=function(n){return console.warn("THREE.Matrix3: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."),this.copy(n).invert()};Fe.prototype.extractPosition=function(n){return console.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."),this.copyPosition(n)};Fe.prototype.flattenToArrayOffset=function(n,e){return console.warn("THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead."),this.toArray(n,e)};Fe.prototype.getPosition=function(){return console.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead."),new D().setFromMatrixColumn(this,3)};Fe.prototype.setRotationFromQuaternion=function(n){return console.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."),this.makeRotationFromQuaternion(n)};Fe.prototype.multiplyToArray=function(){console.warn("THREE.Matrix4: .multiplyToArray() has been removed.")};Fe.prototype.multiplyVector3=function(n){return console.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead."),n.applyMatrix4(this)};Fe.prototype.multiplyVector4=function(n){return console.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."),n.applyMatrix4(this)};Fe.prototype.multiplyVector3Array=function(){console.error("THREE.Matrix4: .multiplyVector3Array() has been removed.")};Fe.prototype.rotateAxis=function(n){console.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."),n.transformDirection(this)};Fe.prototype.crossVector=function(n){return console.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."),n.applyMatrix4(this)};Fe.prototype.translate=function(){console.error("THREE.Matrix4: .translate() has been removed.")};Fe.prototype.rotateX=function(){console.error("THREE.Matrix4: .rotateX() has been removed.")};Fe.prototype.rotateY=function(){console.error("THREE.Matrix4: .rotateY() has been removed.")};Fe.prototype.rotateZ=function(){console.error("THREE.Matrix4: .rotateZ() has been removed.")};Fe.prototype.rotateByAxis=function(){console.error("THREE.Matrix4: .rotateByAxis() has been removed.")};Fe.prototype.applyToBufferAttribute=function(n){return console.warn("THREE.Matrix4: .applyToBufferAttribute() has been removed. Use attribute.applyMatrix4( matrix ) instead."),n.applyMatrix4(this)};Fe.prototype.applyToVector3Array=function(){console.error("THREE.Matrix4: .applyToVector3Array() has been removed.")};Fe.prototype.makeFrustum=function(n,e,t,a,r,i){return console.warn("THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead."),this.makePerspective(n,e,a,t,r,i)};Fe.prototype.getInverse=function(n){return console.warn("THREE.Matrix4: .getInverse() has been removed. Use matrixInv.copy( matrix ).invert(); instead."),this.copy(n).invert()};Vn.prototype.isIntersectionLine=function(n){return console.warn("THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine()."),this.intersectsLine(n)};Gt.prototype.multiplyVector3=function(n){return console.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."),n.applyQuaternion(this)};Gt.prototype.inverse=function(){return console.warn("THREE.Quaternion: .inverse() has been renamed to invert()."),this.invert()};qr.prototype.isIntersectionBox=function(n){return console.warn("THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox()."),this.intersectsBox(n)};qr.prototype.isIntersectionPlane=function(n){return console.warn("THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane()."),this.intersectsPlane(n)};qr.prototype.isIntersectionSphere=function(n){return console.warn("THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere()."),this.intersectsSphere(n)};Qt.prototype.area=function(){return console.warn("THREE.Triangle: .area() has been renamed to .getArea()."),this.getArea()};Qt.prototype.barycoordFromPoint=function(n,e){return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),this.getBarycoord(n,e)};Qt.prototype.midpoint=function(n){return console.warn("THREE.Triangle: .midpoint() has been renamed to .getMidpoint()."),this.getMidpoint(n)};Qt.prototypenormal=function(n){return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),this.getNormal(n)};Qt.prototype.plane=function(n){return console.warn("THREE.Triangle: .plane() has been renamed to .getPlane()."),this.getPlane(n)};Qt.barycoordFromPoint=function(n,e,t,a,r){return console.warn("THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord()."),Qt.getBarycoord(n,e,t,a,r)};Qt.normal=function(n,e,t,a){return console.warn("THREE.Triangle: .normal() has been renamed to .getNormal()."),Qt.getNormal(n,e,t,a)};on.prototype.extractAllPoints=function(n){return console.warn("THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead."),this.extractPoints(n)};on.prototype.extrude=function(n){return console.warn("THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead."),new Pn(this,n)};on.prototype.makeGeometry=function(n){return console.warn("THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead."),new lg(this,n)};le.prototype.fromAttribute=function(n,e,t){return console.warn("THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(n,e,t)};le.prototype.distanceToManhattan=function(n){return console.warn("THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(n)};le.prototype.lengthManhattan=function(){return console.warn("THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()};D.prototype.setEulerFromRotationMatrix=function(){console.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")};D.prototype.setEulerFromQuaternion=function(){console.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")};D.prototype.getPositionFromMatrix=function(n){return console.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."),this.setFromMatrixPosition(n)};D.prototype.getScaleFromMatrix=function(n){return console.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."),this.setFromMatrixScale(n)};D.prototype.getColumnFromMatrix=function(n,e){return console.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."),this.setFromMatrixColumn(e,n)};D.prototype.applyProjection=function(n){return console.warn("THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead."),this.applyMatrix4(n)};D.prototype.fromAttribute=function(n,e,t){return console.warn("THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(n,e,t)};D.prototype.distanceToManhattan=function(n){return console.warn("THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo()."),this.manhattanDistanceTo(n)};D.prototype.lengthManhattan=function(){return console.warn("THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()};Ye.prototype.fromAttribute=function(n,e,t){return console.warn("THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute()."),this.fromBufferAttribute(n,e,t)};Ye.prototype.lengthManhattan=function(){return console.warn("THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength()."),this.manhattanLength()};Xe.prototype.getChildByName=function(n){return console.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."),this.getObjectByName(n)};Xe.prototype.renderDepth=function(){console.warn("THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.")};Xe.prototype.translate=function(n,e){return console.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."),this.translateOnAxis(e,n)};Xe.prototype.getWorldRotation=function(){console.error("THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.")};Xe.prototype.applyMatrix=function(n){return console.warn("THREE.Object3D: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(n)};Object.defineProperties(Xe.prototype,{eulerOrder:{get:function(){return console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order},set:function(n){console.warn("THREE.Object3D: .eulerOrder is now .rotation.order."),this.rotation.order=n}},useQuaternion:{get:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")},set:function(){console.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")}}});Le.prototype.setDrawMode=function(){console.error("THREE.Mesh: .setDrawMode() has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")};Object.defineProperties(Le.prototype,{drawMode:{get:function(){return console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode."),rL},set:function(){console.error("THREE.Mesh: .drawMode has been removed. The renderer now always assumes THREE.TrianglesDrawMode. Transform your geometry via BufferGeometryUtils.toTrianglesDrawMode() if necessary.")}}});Vc.prototype.initBones=function(){console.error("THREE.SkinnedMesh: initBones() has been removed.")};Ft.prototype.setLens=function(n,e){console.warn("THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup."),e!==void 0&&(this.filmGauge=e),this.setFocalLength(n)};Object.defineProperties(jn.prototype,{onlyShadow:{set:function(){console.warn("THREE.Light: .onlyShadow has been removed.")}},shadowCameraFov:{set:function(n){console.warn("THREE.Light: .shadowCameraFov is now .shadow.camera.fov."),this.shadow.camera.fov=n}},shadowCameraLeft:{set:function(n){console.warn("THREE.Light: .shadowCameraLeft is now .shadow.camera.left."),this.shadow.camera.left=n}},shadowCameraRight:{set:function(n){console.warn("THREE.Light: .shadowCameraRight is now .shadow.camera.right."),this.shadow.camera.right=n}},shadowCameraTop:{set:function(n){console.warn("THREE.Light: .shadowCameraTop is now .shadow.camera.top."),this.shadow.camera.top=n}},shadowCameraBottom:{set:function(n){console.warn("THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom."),this.shadow.camera.bottom=n}},shadowCameraNear:{set:function(n){console.warn("THREE.Light: .shadowCameraNear is now .shadow.camera.near."),this.shadow.camera.near=n}},shadowCameraFar:{set:function(n){console.warn("THREE.Light: .shadowCameraFar is now .shadow.camera.far."),this.shadow.camera.far=n}},shadowCameraVisible:{set:function(){console.warn("THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.")}},shadowBias:{set:function(n){console.warn("THREE.Light: .shadowBias is now .shadow.bias."),this.shadow.bias=n}},shadowDarkness:{set:function(){console.warn("THREE.Light: .shadowDarkness has been removed.")}},shadowMapWidth:{set:function(n){console.warn("THREE.Light: .shadowMapWidth is now .shadow.mapSize.width."),this.shadow.mapSize.width=n}},shadowMapHeight:{set:function(n){console.warn("THREE.Light: .shadowMapHeight is now .shadow.mapSize.height."),this.shadow.mapSize.height=n}}});Object.defineProperties(vt.prototype,{length:{get:function(){return console.warn("THREE.BufferAttribute: .length has been deprecated. Use .count instead."),this.array.length}},dynamic:{get:function(){return console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."),this.usage===Nc},set:function(){console.warn("THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead."),this.setUsage(Nc)}}});vt.prototype.setDynamic=function(n){return console.warn("THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead."),this.setUsage(n===!0?Nc:Bl),this};vt.prototype.copyIndicesArray=function(){console.error("THREE.BufferAttribute: .copyIndicesArray() has been removed.")},vt.prototype.setArray=function(){console.error("THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")};et.prototype.addIndex=function(n){console.warn("THREE.BufferGeometry: .addIndex() has been renamed to .setIndex()."),this.setIndex(n)};et.prototype.addAttribute=function(n,e){return console.warn("THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute()."),!(e&&e.isBufferAttribute)&&!(e&&e.isInterleavedBufferAttribute)?(console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),this.setAttribute(n,new vt(arguments[1],arguments[2]))):n==="index"?(console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."),this.setIndex(e),this):this.setAttribute(n,e)};et.prototype.addDrawCall=function(n,e,t){t!==void 0&&console.warn("THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset."),console.warn("THREE.BufferGeometry: .addDrawCall() is now .addGroup()."),this.addGroup(n,e)};et.prototype.clearDrawCalls=function(){console.warn("THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups()."),this.clearGroups()};et.prototype.computeOffsets=function(){console.warn("THREE.BufferGeometry: .computeOffsets() has been removed.")};et.prototype.removeAttribute=function(n){return console.warn("THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute()."),this.deleteAttribute(n)};et.prototype.applyMatrix=function(n){return console.warn("THREE.BufferGeometry: .applyMatrix() has been renamed to .applyMatrix4()."),this.applyMatrix4(n)};Object.defineProperties(et.prototype,{drawcalls:{get:function(){return console.error("THREE.BufferGeometry: .drawcalls has been renamed to .groups."),this.groups}},offsets:{get:function(){return console.warn("THREE.BufferGeometry: .offsets has been renamed to .groups."),this.groups}}});Ni.prototype.setDynamic=function(n){return console.warn("THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead."),this.setUsage(n===!0?Nc:Bl),this};Ni.prototype.setArray=function(){console.error("THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers")};Pn.prototype.getArrays=function(){console.error("THREE.ExtrudeGeometry: .getArrays() has been removed.")};Pn.prototype.addShapeList=function(){console.error("THREE.ExtrudeGeometry: .addShapeList() has been removed.")};Pn.prototype.addShape=function(){console.error("THREE.ExtrudeGeometry: .addShape() has been removed.")};Zs.prototype.dispose=function(){console.error("THREE.Scene: .dispose() has been removed.")};Wg.prototype.onUpdate=function(){return console.warn("THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead."),this};Object.defineProperties(Bt.prototype,{wrapAround:{get:function(){console.warn("THREE.Material: .wrapAround has been removed.")},set:function(){console.warn("THREE.Material: .wrapAround has been removed.")}},overdraw:{get:function(){console.warn("THREE.Material: .overdraw has been removed.")},set:function(){console.warn("THREE.Material: .overdraw has been removed.")}},wrapRGB:{get:function(){return console.warn("THREE.Material: .wrapRGB has been removed."),new Ce}},shading:{get:function(){console.error("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead.")},set:function(n){console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=n===H1}},stencilMask:{get:function(){return console.warn("THREE."+this.type+": .stencilMask has been removed. Use .stencilFuncMask instead."),this.stencilFuncMask},set:function(n){console.warn("THREE."+this.type+": .stencilMask has been removed. Use .stencilFuncMask instead."),this.stencilFuncMask=n}}});Object.defineProperties(nr.prototype,{derivatives:{get:function(){return console.warn("THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives},set:function(n){console.warn("THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives."),this.extensions.derivatives=n}}});Qe.prototype.clearTarget=function(n,e,t,a){console.warn("THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead."),this.setRenderTarget(n),this.clear(e,t,a)};Qe.prototype.animate=function(n){console.warn("THREE.WebGLRenderer: .animate() is now .setAnimationLoop()."),this.setAnimationLoop(n)};Qe.prototype.getCurrentRenderTarget=function(){return console.warn("THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget()."),this.getRenderTarget()};Qe.prototype.getMaxAnisotropy=function(){return console.warn("THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy()."),this.capabilities.getMaxAnisotropy()};Qe.prototype.getPrecision=function(){return console.warn("THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision."),this.capabilities.precision};Qe.prototype.resetGLState=function(){return console.warn("THREE.WebGLRenderer: .resetGLState() is now .state.reset()."),this.state.reset()};Qe.prototype.supportsFloatTextures=function(){return console.warn("THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' )."),this.extensions.get("OES_texture_float")};Qe.prototype.supportsHalfFloatTextures=function(){return console.warn("THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' )."),this.extensions.get("OES_texture_half_float")};Qe.prototype.supportsStandardDerivatives=function(){return console.warn("THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' )."),this.extensions.get("OES_standard_derivatives")};Qe.prototype.supportsCompressedTextureS3TC=function(){return console.warn("THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' )."),this.extensions.get("WEBGL_compressed_texture_s3tc")};Qe.prototype.supportsCompressedTexturePVRTC=function(){return console.warn("THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' )."),this.extensions.get("WEBGL_compressed_texture_pvrtc")};Qe.prototype.supportsBlendMinMax=function(){return console.warn("THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' )."),this.extensions.get("EXT_blend_minmax")};Qe.prototype.supportsVertexTextures=function(){return console.warn("THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures."),this.capabilities.vertexTextures};Qe.prototype.supportsInstancedArrays=function(){return console.warn("THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' )."),this.extensions.get("ANGLE_instanced_arrays")};Qe.prototype.enableScissorTest=function(n){console.warn("THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest()."),this.setScissorTest(n)};Qe.prototype.initMaterial=function(){console.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")};Qe.prototype.addPrePlugin=function(){console.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")};Qe.prototype.addPostPlugin=function(){console.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")};Qe.prototype.updateShadowMap=function(){console.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")};Qe.prototype.setFaceCulling=function(){console.warn("THREE.WebGLRenderer: .setFaceCulling() has been removed.")};Qe.prototype.allocTextureUnit=function(){console.warn("THREE.WebGLRenderer: .allocTextureUnit() has been removed.")};Qe.prototype.setTexture=function(){console.warn("THREE.WebGLRenderer: .setTexture() has been removed.")};Qe.prototype.setTexture2D=function(){console.warn("THREE.WebGLRenderer: .setTexture2D() has been removed.")};Qe.prototype.setTextureCube=function(){console.warn("THREE.WebGLRenderer: .setTextureCube() has been removed.")};Qe.prototype.getActiveMipMapLevel=function(){return console.warn("THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel()."),this.getActiveMipmapLevel()};Object.defineProperties(Qe.prototype,{shadowMapEnabled:{get:function(){return this.shadowMap.enabled},set:function(n){console.warn("THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled."),this.shadowMap.enabled=n}},shadowMapType:{get:function(){return this.shadowMap.type},set:function(n){console.warn("THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type."),this.shadowMap.type=n}},shadowMapCullFace:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.")}},context:{get:function(){return console.warn("THREE.WebGLRenderer: .context has been removed. Use .getContext() instead."),this.getContext()}},vr:{get:function(){return console.warn("THREE.WebGLRenderer: .vr has been renamed to .xr"),this.xr}},gammaInput:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead."),!1},set:function(){console.warn("THREE.WebGLRenderer: .gammaInput has been removed. Set the encoding for textures via Texture.encoding instead.")}},gammaOutput:{get:function(){return console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."),!1},set:function(n){console.warn("THREE.WebGLRenderer: .gammaOutput has been removed. Set WebGLRenderer.outputEncoding instead."),this.outputEncoding=n===!0?Aa:Sn}},toneMappingWhitePoint:{get:function(){return console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed."),1},set:function(){console.warn("THREE.WebGLRenderer: .toneMappingWhitePoint has been removed.")}}});Object.defineProperties(aw.prototype,{cullFace:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.")}},renderReverseSided:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.")}},renderSingleSided:{get:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")},set:function(){console.warn("THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.")}}});Object.defineProperties(Ea.prototype,{wrapS:{get:function(){return console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS},set:function(n){console.warn("THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS."),this.texture.wrapS=n}},wrapT:{get:function(){return console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT},set:function(n){console.warn("THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT."),this.texture.wrapT=n}},magFilter:{get:function(){return console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter},set:function(n){console.warn("THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter."),this.texture.magFilter=n}},minFilter:{get:function(){return console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter},set:function(n){console.warn("THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter."),this.texture.minFilter=n}},anisotropy:{get:function(){return console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy},set:function(n){console.warn("THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy."),this.texture.anisotropy=n}},offset:{get:function(){return console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset},set:function(n){console.warn("THREE.WebGLRenderTarget: .offset is now .texture.offset."),this.texture.offset=n}},repeat:{get:function(){return console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat},set:function(n){console.warn("THREE.WebGLRenderTarget: .repeat is now .texture.repeat."),this.texture.repeat=n}},format:{get:function(){return console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format},set:function(n){console.warn("THREE.WebGLRenderTarget: .format is now .texture.format."),this.texture.format=n}},type:{get:function(){return console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type},set:function(n){console.warn("THREE.WebGLRenderTarget: .type is now .texture.type."),this.texture.type=n}},generateMipmaps:{get:function(){return console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps},set:function(n){console.warn("THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps."),this.texture.generateMipmaps=n}}});zg.prototype.load=function(n){console.warn("THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.");let e=this;return new Dg().load(n,function(a){e.setBuffer(a)}),this};Og.prototype.getData=function(){return console.warn("THREE.AudioAnalyser: .getData() is now .getFrequencyData()."),this.getFrequencyData()};Ol.prototype.updateCubeMap=function(n,e){return console.warn("THREE.CubeCamera: .updateCubeMap() is now .update()."),this.update(n,e)};Ol.prototype.clear=function(n,e,t,a){return console.warn("THREE.CubeCamera: .clear() is now .renderTarget.clear()."),this.renderTarget.clear(n,e,t,a)};Vr.crossOrigin=void 0;Vr.loadTexture=function(n,e,t,a){console.warn("THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.");let r=new Sg;r.setCrossOrigin(this.crossOrigin);let i=r.load(n,t,void 0,a);return e&&(i.mapping=e),i};Vr.loadTextureCube=function(n,e,t,a){console.warn("THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.");let r=new wg;r.setCrossOrigin(this.crossOrigin);let i=r.load(n,t,void 0,a);return e&&(i.mapping=e),i};Vr.loadCompressedTexture=function(){console.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")};Vr.loadCompressedTextureCube=function(){console.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"128"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="128");var pf=_o(qi());var cw=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),ff=(...n)=>n.filter((e,t,a)=>!!e&&a.indexOf(e)===t).join(" ");var nu=_o(qi());var fw={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};var pw=(0,nu.forwardRef)(({color:n="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:a,className:r="",children:i,iconNode:s,...l},u)=>(0,nu.createElement)("svg",{ref:u,...fw,width:e,height:e,stroke:n,strokeWidth:a?Number(t)*24/Number(e):t,className:ff("lucide",r),...l},[...s.map(([d,f])=>(0,nu.createElement)(d,f)),...Array.isArray(i)?i:[i]]));var _e=(n,e)=>{let t=(0,pf.forwardRef)(({className:a,...r},i)=>(0,pf.createElement)(pw,{ref:i,iconNode:e,className:ff(`lucide-${cw(n)}`,a),...r}));return t.displayName=`${n}`,t};var Bi=_e("Banknote",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M6 12h.01M18 12h.01",key:"113zkx"}]]);var au=_e("Cake",[["path",{d:"M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8",key:"1w3rig"}],["path",{d:"M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1",key:"n2jgmb"}],["path",{d:"M2 21h20",key:"1nyx9w"}],["path",{d:"M7 8v3",key:"1qtyvj"}],["path",{d:"M12 8v3",key:"hwp4zt"}],["path",{d:"M17 8v3",key:"1i6e5u"}],["path",{d:"M7 4h0.01",key:"hsw7lv"}],["path",{d:"M12 4h0.01",key:"1e3d8f"}],["path",{d:"M17 4h0.01",key:"p7cxgy"}]]);var Kr=_e("CalendarDays",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]]);var ar=_e("Car",[["path",{d:"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",key:"5owen"}],["circle",{cx:"7",cy:"17",r:"2",key:"u2ysq9"}],["path",{d:"M9 17h6",key:"r8uit2"}],["circle",{cx:"17",cy:"17",r:"2",key:"axvx0g"}]]);var ei=_e("ChevronLeft",[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]]);var un=_e("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);var ti=_e("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);var fa=_e("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);var ru=_e("Flag",[["path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z",key:"i9b6wo"}],["line",{x1:"4",x2:"4",y1:"22",y2:"15",key:"1cm3nv"}]]);var ni=_e("GraduationCap",[["path",{d:"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",key:"j76jl0"}],["path",{d:"M22 10v6",key:"1lu8f3"}],["path",{d:"M6 12.5V16a6 3 0 0 0 12 0v-3.5",key:"1r8lef"}]]);var iu=_e("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);var dn=_e("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);var ai=_e("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]);var zi=_e("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);var ka=_e("Pencil",[["path",{d:"M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z",key:"5qss01"}],["path",{d:"m15 5 4 4",key:"1mk7zo"}]]);var su=_e("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);var cn=_e("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);var Oi=_e("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);var Na=_e("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);var ou=_e("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);var lo=_e("Smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);var Hi=_e("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);var lu=_e("Sunrise",[["path",{d:"M12 2v8",key:"1q4o3n"}],["path",{d:"m4.93 10.93 1.41 1.41",key:"2a7f42"}],["path",{d:"M2 18h2",key:"j10viu"}],["path",{d:"M20 18h2",key:"wocana"}],["path",{d:"m19.07 10.93-1.41 1.41",key:"15zs5n"}],["path",{d:"M22 22H2",key:"19qnx5"}],["path",{d:"m8 6 4-4 4 4",key:"ybng9g"}],["path",{d:"M16 18a4 4 0 0 0-8 0",key:"1lzouq"}]]);var uu=_e("Sunset",[["path",{d:"M12 10V2",key:"16sf7g"}],["path",{d:"m4.93 10.93 1.41 1.41",key:"2a7f42"}],["path",{d:"M2 18h2",key:"j10viu"}],["path",{d:"M20 18h2",key:"wocana"}],["path",{d:"m19.07 10.93-1.41 1.41",key:"15zs5n"}],["path",{d:"M22 22H2",key:"19qnx5"}],["path",{d:"m16 6-4 4-4-4",key:"6wukr"}],["path",{d:"M16 18a4 4 0 0 0-8 0",key:"1lzouq"}]]);var pa=_e("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);var Xn=_e("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);var uo=_e("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);var rr=_e("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);var co=_e("Wallet",[["path",{d:"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",key:"18etb6"}],["path",{d:"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4",key:"xoc0q4"}]]);var Pa=_e("WandSparkles",[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]]);var ir=_e("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);