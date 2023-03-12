!function(n){"use strict";/*!
   *  decimal.js v10.4.3
   *  An arbitrary-precision Decimal type for JavaScript.
   *  https://github.com/MikeMcl/decimal.js
   *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
   *  MIT Licence
   */ var i,e,t,r,s="0123456789abcdef",$="2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058",o="3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789",_={precision:20,rounding:4,modulo:1,toExpNeg:-7,toExpPos:21,minE:-9e15,maxE:9e15,crypto:!1},u=!0,c="[DecimalError] ",f=c+"Invalid argument: ",h=c+"Precision limit exceeded",l=c+"crypto unavailable",d="[object Decimal]",a=Math.floor,g=Math.pow,p=/^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i,w=/^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i,m=/^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i,v=/^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,b=$.length-1,x=o.length-1,E={toStringTag:d};function N(n){var i,e,t,r=n.length-1,s="",$=n[0];if(r>0){for(s+=$,i=1;i<r;i++)(e=7-(t=n[i]+"").length)&&(s+=S(e)),s+=t;(e=7-(t=($=n[i])+"").length)&&(s+=S(e))}else if(0===$)return"0";for(;$%10==0;)$/=10;return s+$}function y(n,i,e){if(n!==~~n||n<i||n>e)throw Error(f+n)}function q(n,i,e,t){var r,s,$,o;for(s=n[0];s>=10;s/=10)--i;return--i<0?(i+=7,r=0):(r=Math.ceil((i+1)/7),i%=7),s=g(10,7-i),o=n[r]%s|0,null==t?i<3?(0==i?o=o/100|0:1==i&&(o=o/10|0),$=e<4&&99999==o||e>3&&49999==o||5e4==o||0==o):$=(e<4&&o+1==s||e>3&&o+1==s/2)&&(n[r+1]/s/100|0)==g(10,i-2)-1||(o==s/2||0==o)&&(n[r+1]/s/100|0)==0:i<4?(0==i?o=o/1e3|0:1==i?o=o/100|0:2==i&&(o=o/10|0),$=(t||e<4)&&9999==o||!t&&e>3&&4999==o):$=((t||e<4)&&o+1==s||!t&&e>3&&o+1==s/2)&&(n[r+1]/s/1e3|0)==g(10,i-3)-1,$}function O(n,i,e){for(var t,r,$=[0],o=0,_=n.length;o<_;){for(r=$.length;r--;)$[r]*=i;for($[0]+=s.indexOf(n.charAt(o++)),t=0;t<$.length;t++)$[t]>e-1&&(void 0===$[t+1]&&($[t+1]=0),$[t+1]+=$[t]/e|0,$[t]%=e)}return $.reverse()}E.absoluteValue=E.abs=function(){var n=new this.constructor(this);return n.s<0&&(n.s=1),F(n)},E.ceil=function(){return F(new this.constructor(this),this.e+1,2)},E.clampedTo=E.clamp=function(n,i){var e,t=this.constructor;if(n=new t(n),i=new t(i),!n.s||!i.s)return new t(NaN);if(n.gt(i))throw Error(f+i);return(e=this.cmp(n))<0?n:this.cmp(i)>0?i:new t(this)},E.comparedTo=E.cmp=function(n){var i,e,t,r,s=this.d,$=(n=new this.constructor(n)).d,o=this.s,_=n.s;if(!s||!$)return o&&_?o!==_?o:s===$?0:!s^o<0?1:-1:NaN;if(!s[0]||!$[0])return s[0]?o:$[0]?-_:0;if(o!==_)return o;if(this.e!==n.e)return this.e>n.e^o<0?1:-1;for(i=0,t=s.length,e=t<(r=$.length)?t:r;i<e;++i)if(s[i]!==$[i])return s[i]>$[i]^o<0?1:-1;return t===r?0:t>r^o<0?1:-1},E.cosine=E.cos=function(){var n,i,e=this,t=e.constructor;return e.d?e.d[0]?(n=t.precision,i=t.rounding,t.precision=n+Math.max(e.e,e.sd())+7,t.rounding=1,e=function n(i,e){var t,r,s;if(e.isZero())return e;(r=e.d.length)<32?s=(1/j(4,t=Math.ceil(r/3))).toString():(t=16,s="2.3283064365386962890625e-10"),i.precision+=t,e=V(i,1,e.times(s),new i(1));for(var $=t;$--;){var o=e.times(e);e=o.times(o).minus(o).times(8).plus(1)}return i.precision-=t,e}(t,W(t,e)),t.precision=n,t.rounding=i,F(2==r||3==r?e.neg():e,n,i,!0)):new t(1):new t(NaN)},E.cubeRoot=E.cbrt=function(){var n,i,e,t,r,s,$,o,_,c,f=this.constructor;if(!this.isFinite()||this.isZero())return new f(this);for(u=!1,(s=this.s*g(this.s*this,1/3))&&Math.abs(s)!=1/0?t=new f(s.toString()):(e=N(this.d),(s=((n=this.e)-e.length+1)%3)&&(e+=1==s||-2==s?"0":"00"),s=g(e,1/3),n=a((n+1)/3)-(n%3==(n<0?-1:2)),e=s==1/0?"5e"+n:(e=s.toExponential()).slice(0,e.indexOf("e")+1)+n,(t=new f(e)).s=this.s),$=(n=f.precision)+3;;)if(t=D((c=(_=(o=t).times(o).times(o)).plus(this)).plus(this).times(o),c.plus(_),$+2,1),N(o.d).slice(0,$)===(e=N(t.d)).slice(0,$)){if("9999"!=(e=e.slice($-3,$+1))&&(r||"4999"!=e)){+e&&(+e.slice(1)||"5"!=e.charAt(0))||(F(t,n+1,1),i=!t.times(t).times(t).eq(this));break}if(!r&&(F(o,n+1,0),o.times(o).times(o).eq(this))){t=o;break}$+=4,r=1}return u=!0,F(t,n,f.rounding,i)},E.decimalPlaces=E.dp=function(){var n,i=this.d,e=NaN;if(i){if(e=((n=i.length-1)-a(this.e/7))*7,n=i[n])for(;n%10==0;n/=10)e--;e<0&&(e=0)}return e},E.dividedBy=E.div=function(n){return D(this,new this.constructor(n))},E.dividedToIntegerBy=E.divToInt=function(n){var i=this.constructor;return F(D(this,new i(n),0,1,1),i.precision,i.rounding)},E.equals=E.eq=function(n){return 0===this.cmp(n)},E.floor=function(){return F(new this.constructor(this),this.e+1,3)},E.greaterThan=E.gt=function(n){return this.cmp(n)>0},E.greaterThanOrEqualTo=E.gte=function(n){var i=this.cmp(n);return 1==i||0===i},E.hyperbolicCosine=E.cosh=function(){var n,i,e,t,r,s=this,$=s.constructor,o=new $(1);if(!s.isFinite())return new $(s.s?1/0:NaN);if(s.isZero())return o;e=$.precision,t=$.rounding,$.precision=e+Math.max(s.e,s.sd())+4,$.rounding=1,(r=s.d.length)<32?i=(1/j(4,n=Math.ceil(r/3))).toString():(n=16,i="2.3283064365386962890625e-10"),s=V($,1,s.times(i),new $(1),!0);for(var _,u=n,c=new $(8);u--;)_=s.times(s),s=o.minus(_.times(c.minus(_.times(c))));return F(s,$.precision=e,$.rounding=t,!0)},E.hyperbolicSine=E.sinh=function(){var n,i,e,t,r=this,s=r.constructor;if(!r.isFinite()||r.isZero())return new s(r);if(i=s.precision,e=s.rounding,s.precision=i+Math.max(r.e,r.sd())+4,s.rounding=1,(t=r.d.length)<3)r=V(s,2,r,r,!0);else{n=(n=1.4*Math.sqrt(t))>16?16:0|n,r=V(s,2,r=r.times(1/j(5,n)),r,!0);for(var $,o=new s(5),_=new s(16),u=new s(20);n--;)$=r.times(r),r=r.times(o.plus($.times(_.times($).plus(u))))}return s.precision=i,s.rounding=e,F(r,i,e,!0)},E.hyperbolicTangent=E.tanh=function(){var n,i,e=this.constructor;return this.isFinite()?this.isZero()?new e(this):(n=e.precision,i=e.rounding,e.precision=n+7,e.rounding=1,D(this.sinh(),this.cosh(),e.precision=n,e.rounding=i)):new e(this.s)},E.inverseCosine=E.acos=function(){var n,i=this,e=i.constructor,t=i.abs().cmp(1),r=e.precision,s=e.rounding;return -1!==t?0===t?i.isNeg()?R(e,r,s):new e(0):new e(NaN):i.isZero()?R(e,r+4,s).times(.5):(e.precision=r+6,e.rounding=1,i=i.asin(),n=R(e,r+4,s).times(.5),e.precision=r,e.rounding=s,n.minus(i))},E.inverseHyperbolicCosine=E.acosh=function(){var n,i,e=this,t=e.constructor;return e.lte(1)?new t(e.eq(1)?0:NaN):e.isFinite()?(n=t.precision,i=t.rounding,t.precision=n+Math.max(Math.abs(e.e),e.sd())+4,t.rounding=1,u=!1,e=e.times(e).minus(1).sqrt().plus(e),u=!0,t.precision=n,t.rounding=i,e.ln()):new t(e)},E.inverseHyperbolicSine=E.asinh=function(){var n,i,e=this,t=e.constructor;return!e.isFinite()||e.isZero()?new t(e):(n=t.precision,i=t.rounding,t.precision=n+2*Math.max(Math.abs(e.e),e.sd())+6,t.rounding=1,u=!1,e=e.times(e).plus(1).sqrt().plus(e),u=!0,t.precision=n,t.rounding=i,e.ln())},E.inverseHyperbolicTangent=E.atanh=function(){var n,i,e,t,r=this,s=r.constructor;return r.isFinite()?r.e>=0?new s(r.abs().eq(1)?r.s/0:r.isZero()?r:NaN):(n=s.precision,i=s.rounding,Math.max(t=r.sd(),n)<-(2*r.e)-1)?F(new s(r),n,i,!0):(s.precision=e=t-r.e,r=D(r.plus(1),new s(1).minus(r),e+n,1),s.precision=n+4,s.rounding=1,r=r.ln(),s.precision=n,s.rounding=i,r.times(.5)):new s(NaN)},E.inverseSine=E.asin=function(){var n,i,e,t,r=this,s=r.constructor;return r.isZero()?new s(r):(i=r.abs().cmp(1),e=s.precision,t=s.rounding,-1!==i)?0===i?((n=R(s,e+4,t).times(.5)).s=r.s,n):new s(NaN):(s.precision=e+6,s.rounding=1,r=r.div(new s(1).minus(r.times(r)).sqrt().plus(1)).atan(),s.precision=e,s.rounding=t,r.times(2))},E.inverseTangent=E.atan=function(){var n,i,e,t,r,s,$,o,_,c=this,f=c.constructor,h=f.precision,l=f.rounding;if(c.isFinite()){if(c.isZero())return new f(c);if(c.abs().eq(1)&&h+4<=x)return($=R(f,h+4,l).times(.25)).s=c.s,$}else{if(!c.s)return new f(NaN);if(h+4<=x)return($=R(f,h+4,l).times(.5)).s=c.s,$}for(f.precision=o=h+10,f.rounding=1,n=e=Math.min(28,o/7+2|0);n;--n)c=c.div(c.times(c).plus(1).sqrt().plus(1));for(u=!1,i=Math.ceil(o/7),t=1,_=c.times(c),$=new f(c),r=c;-1!==n;)if(r=r.times(_),s=$.minus(r.div(t+=2)),r=r.times(_),void 0!==($=s.plus(r.div(t+=2))).d[i])for(n=i;$.d[n]===s.d[n]&&n--;);return e&&($=$.times(2<<e-1)),u=!0,F($,f.precision=h,f.rounding=l,!0)},E.isFinite=function(){return!!this.d},E.isInteger=E.isInt=function(){return!!this.d&&a(this.e/7)>this.d.length-2},E.isNaN=function(){return!this.s},E.isNegative=E.isNeg=function(){return this.s<0},E.isPositive=E.isPos=function(){return this.s>0},E.isZero=function(){return!!this.d&&0===this.d[0]},E.lessThan=E.lt=function(n){return 0>this.cmp(n)},E.lessThanOrEqualTo=E.lte=function(n){return 1>this.cmp(n)},E.logarithm=E.log=function(n){var i,e,t,r,s,$,o,_,c=this.constructor,f=c.precision,h=c.rounding;if(null==n)n=new c(10),i=!0;else{if(e=(n=new c(n)).d,n.s<0||!e||!e[0]||n.eq(1))return new c(NaN);i=n.eq(10)}if(e=this.d,this.s<0||!e||!e[0]||this.eq(1))return new c(e&&!e[0]?-1/0:1!=this.s?NaN:e?0:1/0);if(i){if(e.length>1)s=!0;else{for(r=e[0];r%10==0;)r/=10;s=1!==r}}if(u=!1,$=I(this,o=f+5),t=i?P(c,o+10):I(n,o),q((_=D($,t,o,1)).d,r=f,h))do if(o+=10,$=I(this,o),t=i?P(c,o+10):I(n,o),_=D($,t,o,1),!s){+N(_.d).slice(r+1,r+15)+1==1e14&&(_=F(_,f+1,0));break}while(q(_.d,r+=10,h));return u=!0,F(_,f,h)},E.minus=E.sub=function(n){var i,e,t,r,s,$,o,_,c,f,h,l,d=this.constructor;if(n=new d(n),!this.d||!n.d)return this.s&&n.s?this.d?n.s=-n.s:n=new d(n.d||this.s!==n.s?this:NaN):n=new d(NaN),n;if(this.s!=n.s)return n.s=-n.s,this.plus(n);if(c=this.d,l=n.d,o=d.precision,_=d.rounding,!c[0]||!l[0]){if(l[0])n.s=-n.s;else{if(!c[0])return new d(-0);n=new d(this)}return u?F(n,o,_):n}if(e=a(n.e/7),f=a(this.e/7),c=c.slice(),s=f-e){for((h=s<0)?(i=c,s=-s,$=l.length):(i=l,e=f,$=c.length),s>(t=Math.max(Math.ceil(o/7),$)+2)&&(s=t,i.length=1),i.reverse(),t=s;t--;)i.push(0);i.reverse()}else{for((h=(t=c.length)<($=l.length))&&($=t),t=0;t<$;t++)if(c[t]!=l[t]){h=c[t]<l[t];break}s=0}for(h&&(i=c,c=l,l=i,n.s=-n.s),$=c.length,t=l.length-$;t>0;--t)c[$++]=0;for(t=l.length;t>s;){if(c[--t]<l[t]){for(r=t;r&&0===c[--r];)c[r]=1e7-1;--c[r],c[t]+=1e7}c[t]-=l[t]}for(;0===c[--$];)c.pop();for(;0===c[0];c.shift())--e;return c[0]?(n.d=c,n.e=A(c,e),u?F(n,o,_):n):new d(-0)},E.modulo=E.mod=function(n){var i,e=this.constructor;return(n=new e(n),this.d&&n.s&&(!n.d||n.d[0]))?n.d&&(!this.d||this.d[0])?(u=!1,9==e.modulo?(i=D(this,n.abs(),0,3,1),i.s*=n.s):i=D(this,n,0,e.modulo,1),i=i.times(n),u=!0,this.minus(i)):F(new e(this),e.precision,e.rounding):new e(NaN)},E.naturalExponential=E.exp=function(){return C(this)},E.naturalLogarithm=E.ln=function(){return I(this)},E.negated=E.neg=function(){var n=new this.constructor(this);return n.s=-n.s,F(n)},E.plus=E.add=function(n){var i,e,t,r,s,$,o,_,c,f,h=this.constructor;if(n=new h(n),!this.d||!n.d)return this.s&&n.s?this.d||(n=new h(n.d||this.s===n.s?this:NaN)):n=new h(NaN),n;if(this.s!=n.s)return n.s=-n.s,this.minus(n);if(c=this.d,f=n.d,o=h.precision,_=h.rounding,!c[0]||!f[0])return f[0]||(n=new h(this)),u?F(n,o,_):n;if(s=a(this.e/7),t=a(n.e/7),c=c.slice(),r=s-t){for(r<0?(e=c,r=-r,$=f.length):(e=f,t=s,$=c.length),r>($=(s=Math.ceil(o/7))>$?s+1:$+1)&&(r=$,e.length=1),e.reverse();r--;)e.push(0);e.reverse()}for(($=c.length)-(r=f.length)<0&&(r=$,e=f,f=c,c=e),i=0;r;)i=(c[--r]=c[r]+f[r]+i)/1e7|0,c[r]%=1e7;for(i&&(c.unshift(i),++t),$=c.length;0==c[--$];)c.pop();return n.d=c,n.e=A(c,t),u?F(n,o,_):n},E.precision=E.sd=function(n){var i;if(void 0!==n&&!!n!==n&&1!==n&&0!==n)throw Error(f+n);return this.d?(i=T(this.d),n&&this.e+1>i&&(i=this.e+1)):i=NaN,i},E.round=function(){var n=this.constructor;return F(new n(this),this.e+1,n.rounding)},E.sine=E.sin=function(){var n,i,e=this,t=e.constructor;return e.isFinite()?e.isZero()?new t(e):(n=t.precision,i=t.rounding,t.precision=n+Math.max(e.e,e.sd())+7,t.rounding=1,e=function n(i,e){var t,r=e.d.length;if(r<3)return e.isZero()?e:V(i,2,e,e);t=(t=1.4*Math.sqrt(r))>16?16:0|t,e=V(i,2,e=e.times(1/j(5,t)),e);for(var s,$=new i(5),o=new i(16),_=new i(20);t--;)s=e.times(e),e=e.times($.plus(s.times(o.times(s).minus(_))));return e}(t,W(t,e)),t.precision=n,t.rounding=i,F(r>2?e.neg():e,n,i,!0)):new t(NaN)},E.squareRoot=E.sqrt=function(){var n,i,e,t,r,s,$=this.d,o=this.e,_=this.s,c=this.constructor;if(1!==_||!$||!$[0])return new c(!_||_<0&&(!$||$[0])?NaN:$?this:1/0);for(u=!1,0==(_=Math.sqrt(+this))||_==1/0?(((i=N($)).length+o)%2==0&&(i+="0"),_=Math.sqrt(i),o=a((o+1)/2)-(o<0||o%2),i=_==1/0?"5e"+o:(i=_.toExponential()).slice(0,i.indexOf("e")+1)+o,t=new c(i)):t=new c(_.toString()),e=(o=c.precision)+3;;)if(t=(s=t).plus(D(this,s,e+2,1)).times(.5),N(s.d).slice(0,e)===(i=N(t.d)).slice(0,e)){if("9999"!=(i=i.slice(e-3,e+1))&&(r||"4999"!=i)){+i&&(+i.slice(1)||"5"!=i.charAt(0))||(F(t,o+1,1),n=!t.times(t).eq(this));break}if(!r&&(F(s,o+1,0),s.times(s).eq(this))){t=s;break}e+=4,r=1}return u=!0,F(t,o,c.rounding,n)},E.tangent=E.tan=function(){var n,i,e=this,t=e.constructor;return e.isFinite()?e.isZero()?new t(e):(n=t.precision,i=t.rounding,t.precision=n+10,t.rounding=1,(e=e.sin()).s=1,e=D(e,new t(1).minus(e.times(e)).sqrt(),n+10,0),t.precision=n,t.rounding=i,F(2==r||4==r?e.neg():e,n,i,!0)):new t(NaN)},E.times=E.mul=function(n){var i,e,t,r,s,$,o,_,c,f=this.constructor,h=this.d,l=(n=new f(n)).d;if(n.s*=this.s,!h||!h[0]||!l||!l[0])return new f(n.s&&(!h||h[0]||l)&&(!l||l[0]||h)?h&&l?0*n.s:n.s/0:NaN);for(e=a(this.e/7)+a(n.e/7),(_=h.length)<(c=l.length)&&(s=h,h=l,l=s,$=_,_=c,c=$),s=[],t=$=_+c;t--;)s.push(0);for(t=c;--t>=0;){for(i=0,r=_+t;r>t;)o=s[r]+l[t]*h[r-t-1]+i,s[r--]=o%1e7|0,i=o/1e7|0;s[r]=(s[r]+i)%1e7|0}for(;!s[--$];)s.pop();return i?++e:s.shift(),n.d=s,n.e=A(s,e),u?F(n,f.precision,f.rounding):n},E.toBinary=function(n,i){return J(this,2,n,i)},E.toDecimalPlaces=E.toDP=function(n,i){var e=this,t=e.constructor;return(e=new t(e),void 0===n)?e:(y(n,0,1e9),void 0===i?i=t.rounding:y(i,0,8),F(e,n+e.e+1,i))},E.toExponential=function(n,i){var e,t=this,r=t.constructor;return void 0===n?e=Z(t,!0):(y(n,0,1e9),void 0===i?i=r.rounding:y(i,0,8),e=Z(t=F(new r(t),n+1,i),!0,n+1)),t.isNeg()&&!t.isZero()?"-"+e:e},E.toFixed=function(n,i){var e,t,r=this.constructor;return void 0===n?e=Z(this):(y(n,0,1e9),void 0===i?i=r.rounding:y(i,0,8),e=Z(t=F(new r(this),n+this.e+1,i),!1,n+t.e+1)),this.isNeg()&&!this.isZero()?"-"+e:e},E.toFraction=function(n){var i,e,t,r,s,$,o,_,c,h,l,d,a=this.d,p=this.constructor;if(!a)return new p(this);if(c=e=new p(1),t=_=new p(0),$=(s=(i=new p(t)).e=T(a)-this.e-1)%7,i.d[0]=g(10,$<0?7+$:$),null==n)n=s>0?i:c;else{if(!(o=new p(n)).isInt()||o.lt(c))throw Error(f+o);n=o.gt(i)?s>0?i:c:o}for(u=!1,o=new p(N(a)),h=p.precision,p.precision=s=14*a.length;l=D(o,i,0,1,1),1!=(r=e.plus(l.times(t))).cmp(n);)e=t,t=r,r=c,c=_.plus(l.times(r)),_=r,r=i,i=o.minus(l.times(r)),o=r;return r=D(n.minus(e),t,0,1,1),_=_.plus(r.times(c)),e=e.plus(r.times(t)),_.s=c.s=this.s,d=1>D(c,t,s,1).minus(this).abs().cmp(D(_,e,s,1).minus(this).abs())?[c,t]:[_,e],p.precision=h,u=!0,d},E.toHexadecimal=E.toHex=function(n,i){return J(this,16,n,i)},E.toNearest=function(n,i){var e=this,t=e.constructor;if(e=new t(e),null==n){if(!e.d)return e;n=new t(1),i=t.rounding}else{if(n=new t(n),void 0===i?i=t.rounding:y(i,0,8),!e.d)return n.s?e:n;if(!n.d)return n.s&&(n.s=e.s),n}return n.d[0]?(u=!1,e=D(e,n,0,i,1).times(n),u=!0,F(e)):(n.s=e.s,e=n),e},E.toNumber=function(){return+this},E.toOctal=function(n,i){return J(this,8,n,i)},E.toPower=E.pow=function(n){var i,e,t,r,s,$,o=this,_=o.constructor,c=+(n=new _(n));if(!o.d||!n.d||!o.d[0]||!n.d[0])return new _(g(+o,c));if((o=new _(o)).eq(1))return o;if(t=_.precision,s=_.rounding,n.eq(1))return F(o,t,s);if((i=a(n.e/7))>=n.d.length-1&&(e=c<0?-c:c)<=9007199254740991)return r=L(_,o,e,t),n.s<0?new _(1).div(r):F(r,t,s);if(($=o.s)<0){if(i<n.d.length-1)return new _(NaN);if((1&n.d[i])==0&&($=1),0==o.e&&1==o.d[0]&&1==o.d.length)return o.s=$,o}return(i=0!=(e=g(+o,c))&&isFinite(e)?new _(e+"").e:a(c*(Math.log("0."+N(o.d))/Math.LN10+o.e+1)))>_.maxE+1||i<_.minE-1?new _(i>0?$/0:0):(u=!1,_.rounding=o.s=1,e=Math.min(12,(i+"").length),(r=C(n.times(I(o,t+e)),t)).d&&q((r=F(r,t+5,1)).d,t,s)&&(i=t+10,r=F(C(n.times(I(o,i+e)),i),i+5,1),+N(r.d).slice(t+1,t+15)+1==1e14&&(r=F(r,t+1,0))),r.s=$,u=!0,_.rounding=s,F(r,t,s))},E.toPrecision=function(n,i){var e,t=this,r=t.constructor;return void 0===n?e=Z(t,t.e<=r.toExpNeg||t.e>=r.toExpPos):(y(n,1,1e9),void 0===i?i=r.rounding:y(i,0,8),e=Z(t=F(new r(t),n,i),n<=t.e||t.e<=r.toExpNeg,n)),t.isNeg()&&!t.isZero()?"-"+e:e},E.toSignificantDigits=E.toSD=function(n,i){var e=this.constructor;return void 0===n?(n=e.precision,i=e.rounding):(y(n,1,1e9),void 0===i?i=e.rounding:y(i,0,8)),F(new e(this),n,i)},E.toString=function(){var n=this.constructor,i=Z(this,this.e<=n.toExpNeg||this.e>=n.toExpPos);return this.isNeg()&&!this.isZero()?"-"+i:i},E.truncated=E.trunc=function(){return F(new this.constructor(this),this.e+1,1)},E.valueOf=E.toJSON=function(){var n=this.constructor,i=Z(this,this.e<=n.toExpNeg||this.e>=n.toExpPos);return this.isNeg()?"-"+i:i};var D=function(){function n(n,i,e){var t,r=0,s=n.length;for(n=n.slice();s--;)t=n[s]*i+r,n[s]=t%e|0,r=t/e|0;return r&&n.unshift(r),n}function i(n,i,e,t){var r,s;if(e!=t)s=e>t?1:-1;else for(r=s=0;r<e;r++)if(n[r]!=i[r]){s=n[r]>i[r]?1:-1;break}return s}function t(n,i,e,t){for(var r=0;e--;)n[e]-=r,r=n[e]<i[e]?1:0,n[e]=r*t+n[e]-i[e];for(;!n[0]&&n.length>1;)n.shift()}return function(r,s,$,o,_,u){var c,f,h,l,d,g,p,w,m,v,b,x,E,N,y,q,O,D,Z,A,P=r.constructor,R=r.s==s.s?1:-1,T=r.d,S=s.d;if(!T||!T[0]||!S||!S[0])return new P(r.s&&s.s&&(T?!S||T[0]!=S[0]:S)?T&&0==T[0]||!S?0*R:R/0:NaN);for(u?(d=1,f=r.e-s.e):(u=1e7,d=7,f=a(r.e/d)-a(s.e/d)),Z=S.length,O=T.length,v=(m=new P(R)).d=[],h=0;S[h]==(T[h]||0);h++);if(S[h]>(T[h]||0)&&f--,null==$?(N=$=P.precision,o=P.rounding):N=_?$+(r.e-s.e)+1:$,N<0)v.push(1),g=!0;else{if(N=N/d+2|0,h=0,1==Z){for(l=0,S=S[0],N++;(h<O||l)&&N--;h++)y=l*u+(T[h]||0),v[h]=y/S|0,l=y%S|0;g=l||h<O}else{for((l=u/(S[0]+1)|0)>1&&(S=n(S,l,u),T=n(T,l,u),Z=S.length,O=T.length),q=Z,x=(b=T.slice(0,Z)).length;x<Z;)b[x++]=0;(A=S.slice()).unshift(0),D=S[0],S[1]>=u/2&&++D;do l=0,(c=i(S,b,Z,x))<0?(E=b[0],Z!=x&&(E=E*u+(b[1]||0)),(l=E/D|0)>1?(l>=u&&(l=u-1),w=(p=n(S,l,u)).length,x=b.length,1==(c=i(p,b,w,x))&&(l--,t(p,Z<w?A:S,w,u))):(0==l&&(c=l=1),p=S.slice()),(w=p.length)<x&&p.unshift(0),t(b,p,x,u),-1==c&&(x=b.length,(c=i(S,b,Z,x))<1&&(l++,t(b,Z<x?A:S,x,u))),x=b.length):0===c&&(l++,b=[0]),v[h++]=l,c&&b[0]?b[x++]=T[q]||0:(b=[T[q]],x=1);while((q++<O||void 0!==b[0])&&N--);g=void 0!==b[0]}v[0]||v.shift()}if(1==d)m.e=f,e=g;else{for(h=1,l=v[0];l>=10;l/=10)h++;m.e=h+f*d-1,F(m,_?$+m.e+1:$,o,g)}return m}}();function F(n,i,e,t){var r,s,$,o,_,c,f,h,l,d=n.constructor;out:if(null!=i){if(!(h=n.d))return n;for(r=1,o=h[0];o>=10;o/=10)r++;if((s=i-r)<0)s+=7,$=i,_=(f=h[l=0])/g(10,r-$-1)%10|0;else if((l=Math.ceil((s+1)/7))>=(o=h.length)){if(t){for(;o++<=l;)h.push(0);f=_=0,r=1,s%=7,$=s-7+1}else break out}else{for(r=1,f=o=h[l];o>=10;o/=10)r++;s%=7,_=($=s-7+r)<0?0:f/g(10,r-$-1)%10|0}if(t=t||i<0||void 0!==h[l+1]||($<0?f:f%g(10,r-$-1)),c=e<4?(_||t)&&(0==e||e==(n.s<0?3:2)):_>5||5==_&&(4==e||t||6==e&&(s>0?$>0?f/g(10,r-$):0:h[l-1])%10&1||e==(n.s<0?8:7)),i<1||!h[0])return h.length=0,c?(i-=n.e+1,h[0]=g(10,(7-i%7)%7),n.e=-i||0):h[0]=n.e=0,n;if(0==s?(h.length=l,o=1,l--):(h.length=l+1,o=g(10,7-s),h[l]=$>0?(f/g(10,r-$)%g(10,$)|0)*o:0),c)for(;;){if(0==l){for(s=1,$=h[0];$>=10;$/=10)s++;for($=h[0]+=o,o=1;$>=10;$/=10)o++;s!=o&&(n.e++,1e7==h[0]&&(h[0]=1));break}if(h[l]+=o,1e7!=h[l])break;h[l--]=0,o=1}for(s=h.length;0===h[--s];)h.pop()}return u&&(n.e>d.maxE?(n.d=null,n.e=NaN):n.e<d.minE&&(n.e=0,n.d=[0])),n}function Z(n,i,e){if(!n.isFinite())return H(n);var t,r=n.e,s=N(n.d),$=s.length;return i?(e&&(t=e-$)>0?s=s.charAt(0)+"."+s.slice(1)+S(t):$>1&&(s=s.charAt(0)+"."+s.slice(1)),s=s+(n.e<0?"e":"e+")+n.e):r<0?(s="0."+S(-r-1)+s,e&&(t=e-$)>0&&(s+=S(t))):r>=$?(s+=S(r+1-$),e&&(t=e-r-1)>0&&(s=s+"."+S(t))):((t=r+1)<$&&(s=s.slice(0,t)+"."+s.slice(t)),e&&(t=e-$)>0&&(r+1===$&&(s+="."),s+=S(t))),s}function A(n,i){var e=n[0];for(i*=7;e>=10;e/=10)i++;return i}function P(n,i,e){if(i>b)throw u=!0,e&&(n.precision=e),Error(h);return F(new n($),i,1,!0)}function R(n,i,e){if(i>x)throw Error(h);return F(new n(o),i,e,!0)}function T(n){var i=n.length-1,e=7*i+1;if(i=n[i]){for(;i%10==0;i/=10)e--;for(i=n[0];i>=10;i/=10)e++}return e}function S(n){for(var i="";n--;)i+="0";return i}function L(n,i,e,t){var r,s=new n(1),$=Math.ceil(t/7+4);for(u=!1;;){if(e%2&&z((s=s.times(i)).d,$)&&(r=!0),0===(e=a(e/2))){e=s.d.length-1,r&&0===s.d[e]&&++s.d[e];break}z((i=i.times(i)).d,$)}return u=!0,s}function k(n){return 1&n.d[n.d.length-1]}function U(n,i,e){for(var t,r=new n(i[0]),s=0;++s<i.length;)if((t=new n(i[s])).s)r[e](t)&&(r=t);else{r=t;break}return r}function C(n,i){var e,t,r,s,$,o,_,c=0,f=0,h=0,l=n.constructor,d=l.rounding,a=l.precision;if(!n.d||!n.d[0]||n.e>17)return new l(n.d?n.d[0]?n.s<0?0:1/0:1:n.s?n.s<0?0:n:0/0);for(null==i?(u=!1,_=a):_=i,o=new l(.03125);n.e>-2;)n=n.times(o),h+=5;for(_+=t=Math.log(g(2,h))/Math.LN10*2+5|0,e=s=$=new l(1),l.precision=_;;){if(s=F(s.times(n),_,1),e=e.times(++f),N((o=$.plus(D(s,e,_,1))).d).slice(0,_)===N($.d).slice(0,_)){for(r=h;r--;)$=F($.times($),_,1);if(null!=i)return l.precision=a,$;if(!(c<3&&q($.d,_-t,d,c)))return F($,l.precision=a,d,u=!0);l.precision=_+=10,e=s=o=new l(1),f=0,c++}$=o}}function I(n,i){var e,t,r,s,$,o,_,c,f,h,l,d=1,a=n,g=a.d,p=a.constructor,w=p.rounding,m=p.precision;if(a.s<0||!g||!g[0]||!a.e&&1==g[0]&&1==g.length)return new p(g&&!g[0]?-1/0:1!=a.s?NaN:g?0:a);if(null==i?(u=!1,f=m):f=i,p.precision=f+=10,t=(e=N(g)).charAt(0),!(15e14>Math.abs(s=a.e)))return c=P(p,f+2,m).times(s+""),a=I(new p(t+"."+e.slice(1)),f-10).plus(c),p.precision=m,null==i?F(a,m,w,u=!0):a;for(;t<7&&1!=t||1==t&&e.charAt(1)>3;)t=(e=N((a=a.times(n)).d)).charAt(0),d++;for(s=a.e,t>1?(a=new p("0."+e),s++):a=new p(t+"."+e.slice(1)),h=a,_=$=a=D(a.minus(1),a.plus(1),f,1),l=F(a.times(a),f,1),r=3;;){if($=F($.times(l),f,1),N((c=_.plus(D($,new p(r),f,1))).d).slice(0,f)===N(_.d).slice(0,f)){if(_=_.times(2),0!==s&&(_=_.plus(P(p,f+2,m).times(s+""))),_=D(_,new p(d),f,1),null!=i)return p.precision=m,_;if(!q(_.d,f-10,w,o))return F(_,p.precision=m,w,u=!0);p.precision=f+=10,c=$=a=D(h.minus(1),h.plus(1),f,1),l=F(a.times(a),f,1),r=o=1}_=c,r+=2}}function H(n){return String(n.s*n.s/0)}function B(n,i){var e,t,r;for((e=i.indexOf("."))>-1&&(i=i.replace(".","")),(t=i.search(/e/i))>0?(e<0&&(e=t),e+=+i.slice(t+1),i=i.substring(0,t)):e<0&&(e=i.length),t=0;48===i.charCodeAt(t);t++);for(r=i.length;48===i.charCodeAt(r-1);--r);if(i=i.slice(t,r)){if(r-=t,n.e=e=e-t-1,n.d=[],t=(e+1)%7,e<0&&(t+=7),t<r){for(t&&n.d.push(+i.slice(0,t)),r-=7;t<r;)n.d.push(+i.slice(t,t+=7));t=7-(i=i.slice(t)).length}else t-=r;for(;t--;)i+="0";n.d.push(+i),u&&(n.e>n.constructor.maxE?(n.d=null,n.e=NaN):n.e<n.constructor.minE&&(n.e=0,n.d=[0]))}else n.e=0,n.d=[0];return n}function V(n,i,e,t,r){var s,$,o,_,c=1,f=n.precision,h=Math.ceil(f/7);for(u=!1,_=e.times(e),o=new n(t);;){if($=D(o.times(_),new n(i++*i++),f,1),o=r?t.plus($):t.minus($),t=D($.times(_),new n(i++*i++),f,1),void 0!==($=o.plus(t)).d[h]){for(s=h;$.d[s]===o.d[s]&&s--;);if(-1==s)break}s=o,o=t,t=$,$=s,c++}return u=!0,$.d.length=h+1,$}function j(n,i){for(var e=n;--i;)e*=n;return e}function W(n,i){var e,t=i.s<0,s=R(n,n.precision,1),$=s.times(.5);if((i=i.abs()).lte($))return r=t?4:1,i;if((e=i.divToInt(s)).isZero())r=t?3:2;else{if((i=i.minus(e.times(s))).lte($))return r=k(e)?t?2:3:t?4:1,i;r=k(e)?t?1:4:t?3:2}return i.minus(s).abs()}function J(n,i,t,r){var $,o,_,u,c,f,h,l,d,a=n.constructor,g=void 0!==t;if(g?(y(t,1,1e9),void 0===r?r=a.rounding:y(r,0,8)):(t=a.precision,r=a.rounding),n.isFinite()){for(_=(h=Z(n)).indexOf("."),g?($=2,16==i?t=4*t-3:8==i&&(t=3*t-2)):$=i,_>=0&&(h=h.replace(".",""),(d=new a(1)).e=h.length-_,d.d=O(Z(d),10,$),d.e=d.d.length),o=c=(l=O(h,10,$)).length;0==l[--c];)l.pop();if(l[0]){if(_<0?o--:((n=new a(n)).d=l,n.e=o,l=(n=D(n,d,t,r,0,$)).d,o=n.e,f=e),_=l[t],u=$/2,f=f||void 0!==l[t+1],f=r<4?(void 0!==_||f)&&(0===r||r===(n.s<0?3:2)):_>u||_===u&&(4===r||f||6===r&&1&l[t-1]||r===(n.s<0?8:7)),l.length=t,f)for(;++l[--t]>$-1;)l[t]=0,t||(++o,l.unshift(1));for(c=l.length;!l[c-1];--c);for(_=0,h="";_<c;_++)h+=s.charAt(l[_]);if(g){if(c>1){if(16==i||8==i){for(_=16==i?4:3,--c;c%_;c++)h+="0";for(c=(l=O(h,$,i)).length;!l[c-1];--c);for(_=1,h="1.";_<c;_++)h+=s.charAt(l[_])}else h=h.charAt(0)+"."+h.slice(1)}h=h+(o<0?"p":"p+")+o}else if(o<0){for(;++o;)h="0"+h;h="0."+h}else if(++o>c)for(o-=c;o--;)h+="0";else o<c&&(h=h.slice(0,o)+"."+h.slice(o))}else h=g?"0p+0":"0";h=(16==i?"0x":2==i?"0b":8==i?"0o":"")+h}else h=H(n);return n.s<0?"-"+h:h}function z(n,i){if(n.length>i)return n.length=i,!0}function G(n){return new this(n).abs()}function K(n){return new this(n).acos()}function M(n){return new this(n).acosh()}function Q(n,i){return new this(n).plus(i)}function X(n){return new this(n).asin()}function Y(n){return new this(n).asinh()}function nn(n){return new this(n).atan()}function ni(n){return new this(n).atanh()}function ne(n,i){n=new this(n),i=new this(i);var e,t=this.precision,r=this.rounding,s=t+4;return n.s&&i.s?n.d||i.d?!i.d||n.isZero()?(e=i.s<0?R(this,t,r):new this(0)).s=n.s:!n.d||i.isZero()?(e=R(this,s,1).times(.5)).s=n.s:i.s<0?(this.precision=s,this.rounding=1,e=this.atan(D(n,i,s,1)),i=R(this,s,1),this.precision=t,this.rounding=r,e=n.s<0?e.minus(i):e.plus(i)):e=this.atan(D(n,i,s,1)):(e=R(this,s,1).times(i.s>0?.25:.75)).s=n.s:e=new this(NaN),e}function nt(n){return new this(n).cbrt()}function nr(n){return F(n=new this(n),n.e+1,2)}function ns(n,i,e){return new this(n).clamp(i,e)}function n$(n){if(!n||"object"!=typeof n)throw Error(c+"Object expected");var i,e,t,r=!0===n.defaults,s=["precision",1,1e9,"rounding",0,8,"toExpNeg",-9e15,0,"toExpPos",0,9e15,"maxE",0,9e15,"minE",-9e15,0,"modulo",0,9];for(i=0;i<s.length;i+=3)if(e=s[i],r&&(this[e]=_[e]),void 0!==(t=n[e])){if(a(t)===t&&t>=s[i+1]&&t<=s[i+2])this[e]=t;else throw Error(f+e+": "+t)}if(e="crypto",r&&(this[e]=_[e]),void 0!==(t=n[e])){if(!0===t||!1===t||0===t||1===t){if(t){if("undefined"!=typeof crypto&&crypto&&(crypto.getRandomValues||crypto.randomBytes))this[e]=!0;else throw Error(l)}else this[e]=!1}else throw Error(f+e+": "+t)}return this}function no(n){return new this(n).cos()}function n_(n){return new this(n).cosh()}function nu(n,i){return new this(n).div(i)}function nc(n){return new this(n).exp()}function nf(n){return F(n=new this(n),n.e+1,3)}function nh(){var n,i,e=new this(0);for(n=0,u=!1;n<arguments.length;)if(i=new this(arguments[n++]),i.d)e.d&&(e=e.plus(i.times(i)));else{if(i.s)return u=!0,new this(1/0);e=i}return u=!0,e.sqrt()}function nl(n){return n instanceof i||n&&n.toStringTag===d||!1}function nd(n){return new this(n).ln()}function n0(n,i){return new this(n).log(i)}function n5(n){return new this(n).log(2)}function na(n){return new this(n).log(10)}function n7(){return U(this,arguments,"lt")}function n2(){return U(this,arguments,"gt")}function n3(n,i){return new this(n).mod(i)}function n6(n,i){return new this(n).mul(i)}function n1(n,i){return new this(n).pow(i)}function n4(n){var i,e,t,r,s=0,$=new this(1),o=[];if(void 0===n?n=this.precision:y(n,1,1e9),t=Math.ceil(n/7),this.crypto){if(crypto.getRandomValues)for(i=crypto.getRandomValues(new Uint32Array(t));s<t;)(r=i[s])>=429e7?i[s]=crypto.getRandomValues(new Uint32Array(1))[0]:o[s++]=r%1e7;else if(crypto.randomBytes){for(i=crypto.randomBytes(t*=4);s<t;)(r=i[s]+(i[s+1]<<8)+(i[s+2]<<16)+((127&i[s+3])<<24))>=214e7?crypto.randomBytes(4).copy(i,s):(o.push(r%1e7),s+=4);s=t/4}else throw Error(l)}else for(;s<t;)o[s++]=1e7*Math.random()|0;for(t=o[--s],n%=7,t&&n&&(r=g(10,7-n),o[s]=(t/r|0)*r);0===o[s];s--)o.pop();if(s<0)e=0,o=[0];else{for(e=-1;0===o[0];e-=7)o.shift();for(t=1,r=o[0];r>=10;r/=10)t++;t<7&&(e-=7-t)}return $.e=e,$.d=o,$}function ng(n){return F(n=new this(n),n.e+1,this.rounding)}function np(n){return(n=new this(n)).d?n.d[0]?n.s:0*n.s:n.s||NaN}function nw(n){return new this(n).sin()}function nm(n){return new this(n).sinh()}function nv(n){return new this(n).sqrt()}function nb(n,i){return new this(n).sub(i)}function nx(){var n=0,i=arguments,e=new this(i[n]);for(u=!1;e.s&&++n<i.length;)e=e.plus(i[n]);return u=!0,F(e,this.precision,this.rounding)}function nE(n){return new this(n).tan()}function nN(n){return new this(n).tanh()}function ny(n){return F(n=new this(n),n.e+1,1)}(i=function n(e){var t,r,s;function $(n){var e,t,r,s=this;if(!(s instanceof $))return new $(n);if(s.constructor=$,nl(n)){s.s=n.s,u?!n.d||n.e>$.maxE?(s.e=NaN,s.d=null):n.e<$.minE?(s.e=0,s.d=[0]):(s.e=n.e,s.d=n.d.slice()):(s.e=n.e,s.d=n.d?n.d.slice():n.d);return}if("number"==(r=typeof n)){if(0===n){s.s=1/n<0?-1:1,s.e=0,s.d=[0];return}if(n<0?(n=-n,s.s=-1):s.s=1,n===~~n&&n<1e7){for(e=0,t=n;t>=10;t/=10)e++;u?e>$.maxE?(s.e=NaN,s.d=null):e<$.minE?(s.e=0,s.d=[0]):(s.e=e,s.d=[n]):(s.e=e,s.d=[n]);return}if(0*n!=0){n||(s.s=NaN),s.e=NaN,s.d=null;return}return B(s,n.toString())}if("string"!==r)throw Error(f+n);return 45===(t=n.charCodeAt(0))?(n=n.slice(1),s.s=-1):(43===t&&(n=n.slice(1)),s.s=1),v.test(n)?B(s,n):function n(e,t){var r,s,$,o,_,c,h,l,d;if(t.indexOf("_")>-1){if(t=t.replace(/(\d)_(?=\d)/g,"$1"),v.test(t))return B(e,t)}else if("Infinity"===t||"NaN"===t)return+t||(e.s=NaN),e.e=NaN,e.d=null,e;if(w.test(t))r=16,t=t.toLowerCase();else if(p.test(t))r=2;else if(m.test(t))r=8;else throw Error(f+t);for((o=t.search(/p/i))>0?(h=+t.slice(o+1),t=t.substring(2,o)):t=t.slice(2),_=(o=t.indexOf("."))>=0,s=e.constructor,_&&(o=(c=(t=t.replace(".","")).length)-o,$=L(s,new s(r),o,2*o)),o=d=(l=O(t,r,1e7)).length-1;0===l[o];--o)l.pop();return o<0?new s(0*e.s):(e.e=A(l,d),e.d=l,u=!1,_&&(e=D(e,$,4*c)),h&&(e=e.times(54>Math.abs(h)?g(2,h):i.pow(2,h))),u=!0,e)}(s,n)}if($.prototype=E,$.ROUND_UP=0,$.ROUND_DOWN=1,$.ROUND_CEIL=2,$.ROUND_FLOOR=3,$.ROUND_HALF_UP=4,$.ROUND_HALF_DOWN=5,$.ROUND_HALF_EVEN=6,$.ROUND_HALF_CEIL=7,$.ROUND_HALF_FLOOR=8,$.EUCLID=9,$.config=$.set=n$,$.clone=n,$.isDecimal=nl,$.abs=G,$.acos=K,$.acosh=M,$.add=Q,$.asin=X,$.asinh=Y,$.atan=nn,$.atanh=ni,$.atan2=ne,$.cbrt=nt,$.ceil=nr,$.clamp=ns,$.cos=no,$.cosh=n_,$.div=nu,$.exp=nc,$.floor=nf,$.hypot=nh,$.ln=nd,$.log=n0,$.log10=na,$.log2=n5,$.max=n7,$.min=n2,$.mod=n3,$.mul=n6,$.pow=n1,$.random=n4,$.round=ng,$.sign=np,$.sin=nw,$.sinh=nm,$.sqrt=nv,$.sub=nb,$.sum=nx,$.tan=nE,$.tanh=nN,$.trunc=ny,void 0===e&&(e={}),e&&!0!==e.defaults)for(t=0,s=["precision","rounding","toExpNeg","toExpPos","maxE","minE","modulo","crypto"];t<s.length;)e.hasOwnProperty(r=s[t++])||(e[r]=this[r]);return $.config(e),$}(_)).prototype.constructor=i,i.default=i.Decimal=i,$=new i($),o=new i(o),"function"==typeof define&&define.amd?define(function(){return i}):"undefined"!=typeof module&&module.exports?("function"==typeof Symbol&&"symbol"==typeof Symbol.iterator&&(E[Symbol.for("nodejs.util.inspect.custom")]=E.toString,E[Symbol.toStringTag]="Decimal"),module.exports=i):(n||(n="undefined"!=typeof self&&self&&self.self==self?self:window),t=n.Decimal,i.noConflict=function(){return n.Decimal=t,i},n.Decimal=i)}(this);
