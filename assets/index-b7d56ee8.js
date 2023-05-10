var w=Object.defineProperty;var C=(i,t,e)=>t in i?w(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var o=(i,t,e)=>(C(i,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();const L={image:{png:"./images/avatars/image-juliusomo.png",webp:"./images/avatars/image-juliusomo.webp"},username:"juliusomo"},P=[{id:1,content:"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",createdAt:"1 month ago",score:12,user:{image:{png:"./images/avatars/image-amyrobson.png",webp:"./images/avatars/image-amyrobson.webp"},username:"amyrobson"},replies:[]},{id:2,content:"Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",createdAt:"2 weeks ago",score:5,user:{image:{png:"./images/avatars/image-maxblagun.png",webp:"./images/avatars/image-maxblagun.webp"},username:"maxblagun"},replies:[{id:3,content:"If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",createdAt:"1 week ago",score:4,replyingTo:"maxblagun",user:{image:{png:"./images/avatars/image-ramsesmiron.png",webp:"./images/avatars/image-ramsesmiron.webp"},username:"ramsesmiron"}},{id:4,content:"I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",createdAt:"2 days ago",score:2,replyingTo:"ramsesmiron",user:{image:{png:"./images/avatars/image-juliusomo.png",webp:"./images/avatars/image-juliusomo.webp"},username:"juliusomo"}}]}],d={currentUser:L,comments:P},p=(i,t,e={})=>{const{isReply:n,isEditing:s}=e,a=i.username===t.user.username,r='<span class="comment__you">you</span>',y=`
    <div class="comment__options">
      
    <div class="comment__delete">
      <img src="images/icon-delete.svg" alt="Delete" />
      <button class="comment__delete-button" aria-label="Delete">Delete</button>
    </div>
      
    <div class="comment__edit">
      <img src="images/icon-edit.svg" alt="Edit" />
      <button class="comment__edit-button" aria-label="Edit">Edit</button>
    </div>
    </div>`,v=`
    <div class="comment__reply">
      <img src="images/icon-reply.svg" alt="Reply" />
      <button class="comment__reply-button" aria-label="Reply">Reply</button>
    </div>`,_=`<p class="comment__text">${t.content}</p>`,E=`
    <p class="comment__text">
      <span class="comment__replying-to">@${t.replyingTo}</span> ${t.content}
    </p>`,f=`
    <textarea
      class="edit__textarea"
      name="text"
      placeholder="Add a comment...">${t.content}</textarea>`,b=`
    <button class="respond__button update__button" type="submit" aria-label=Update>
      Update
    </button>`;return`
    <div class="comment__user">
      <img
        class="comment__user-image"
        src="${t.user.image.png}"
        alt="${t.user.username}"
      />
      <span class="comment__username">${t.user.username}</span>
      ${a?r:""}
      <span class="comment__createdAt">${t.createdAt}</span>
    </div>
    ${s?f:n?E:_}
    <div class="comment__vote">
      <button class="vote__upvote" aria-label="Upvote">+</button>
      <span class="vote__score" aria-label="Score">${t.score}</span>
      <button class="vote__downvote" aria-label="Downvote">-</button>
    </div>
    ${s?"":a?y:v}
    ${s?b:""}
  `},h=(i,t,e)=>{const n=document.createElement("form");n.classList.add("comment__container","respond");const s=`@${e==null?void 0:e.user.username}`;return n.innerHTML=`
  <textarea
    class="respond__textarea"
    name="text"
    placeholder="Add a comment..."
  >${t==="Reply"?s+" ":""}</textarea>
  <img
    class="comment__user-image respond__user-image"
    src="${i.image.png}"
    alt="${i.username}"
  />
  <button class="respond__button" type="submit" aria-label=${t}>${t}</button>
`,n};class g{constructor(t,e){o(this,"currentUser");o(this,"comment");o(this,"vote");o(this,"replyPanel");this.currentUser=t,this.comment=e,this.vote=0,this.replyPanel=null}createDivElement(...t){const e=document.createElement("div");return e.classList.add(...t),e}renderComment(t,e=!1){t.innerHTML=p(this.currentUser,this.comment,{isReply:e})}handleVote(t){this.comment.score+=t,this.vote+=t}generateReplyPanel(){this.replyPanel=h(this.currentUser,"Reply",this.comment),this.replyPanel.classList.add("slideDown")}generateNewReply(t,e){return{id:Date.now(),user:this.currentUser,createdAt:"Just now",content:t,score:0,replies:[],replyingTo:e}}removeReplyPanel(t=!1){this.replyPanel instanceof HTMLElement&&(t?(this.replyPanel.remove(),this.replyPanel=null):(this.replyPanel.classList.add("slideUp"),this.replyPanel.addEventListener("animationend",()=>{var e;(e=this.replyPanel)==null||e.remove(),this.replyPanel=null})))}renderUpdatePanel(t){t.innerHTML=p(this.currentUser,this.comment,{isEditing:!0});const e=t.querySelector("textarea");e.style.height=`${e.scrollHeight}px`}removeComment(t){t.classList.add("slideUp"),t.addEventListener("animationend",()=>t.remove())}showDeleteModal(t){const e=t.closest(".comment"),n=document.querySelector("#app"),s=document.querySelector("template"),r=document.importNode(s.content,!0).querySelector(".modal");r==null||r.addEventListener("click",m=>{const c=m.target;c.classList.contains("delete__yes")?(this.removeComment(e),this.hideDeleteModal()):c.classList.contains("delete__no")&&this.hideDeleteModal()}),n==null||n.appendChild(r)}hideDeleteModal(){const t=document.querySelector(".modal");t.classList.add("fadeOut"),t.addEventListener("animationend",()=>{t.remove()})}}class l extends g{constructor(e,n){super(e,n);o(this,"replyEl");o(this,"replyContainerEl");this.replyEl=this.createDivElement("comment","reply"),this.replyContainerEl=this.createDivElement("comment__container"),this.replyEl.appendChild(this.replyContainerEl),this.renderComment(this.replyContainerEl,!0),this.replyContainerEl.addEventListener("click",s=>{s.stopPropagation();const a=s.target;if(a.classList.contains("vote__upvote")&&this.vote<=0)this.handleVote(1),this.renderComment(this.replyContainerEl,!0);else if(a.classList.contains("vote__downvote")&&this.vote>=0)this.handleVote(-1),this.renderComment(this.replyContainerEl,!0);else if(a.classList.contains("comment__reply")){if(this.replyPanel)return this.removeReplyPanel();this.showReplyPanel()}else if(a.classList.contains("comment__delete"))this.showDeleteModal(a);else if(a.classList.contains("comment__edit"))this.renderUpdatePanel(this.replyContainerEl);else if(a.classList.contains("update__button")){const r=this.replyContainerEl.querySelector("textarea");this.comment.content=(r==null?void 0:r.value)||"",this.renderComment(this.replyContainerEl,!0)}})}showReplyPanel(){this.generateReplyPanel(),this.replyPanel&&(this.replyContainerEl.insertAdjacentElement("afterend",this.replyPanel),this.replyPanel.addEventListener("submit",e=>{e.preventDefault();const n=e.target.text.value;this.addSubReply(n),this.removeReplyPanel(!0)}))}addSubReply(e){if(!e.length)return;e[0]=="@"&&(e=e.slice(e.indexOf(" ")+1));const n=this.generateNewReply(e,this.comment.user.username),s=new l(this.currentUser,n);this.replyEl.closest(".replies__container")&&(this.replyEl.closest(".replies__container").insertAdjacentElement("beforeend",s.replyEl),s.replyEl.classList.add("slideDown"))}}class u extends g{constructor(e,n){super(e,n);o(this,"commentEl");o(this,"commentContainerEl");o(this,"repliesContainerEl");this.commentEl=this.createDivElement("comment"),this.commentContainerEl=this.createDivElement("comment__container"),this.repliesContainerEl=this.createDivElement("replies__container"),this.commentEl.appendChild(this.commentContainerEl),this.commentEl.appendChild(this.repliesContainerEl),this.renderComment(this.commentContainerEl),this.loadReplies(),this.commentEl.addEventListener("click",s=>{s.stopPropagation();const a=s.target;if(a.classList.contains("vote__upvote")&&this.vote<=0)this.handleVote(1),this.renderComment(this.commentContainerEl);else if(a.classList.contains("vote__downvote")&&this.vote>=0)this.handleVote(-1),this.renderComment(this.commentContainerEl);else if(a.classList.contains("comment__reply")){if(this.replyPanel)return this.removeReplyPanel();this.showReplyPanel()}else if(a.classList.contains("comment__delete"))this.showDeleteModal(a);else if(a.classList.contains("comment__edit"))this.renderUpdatePanel(this.commentContainerEl);else if(a.classList.contains("update__button")){const r=this.commentContainerEl.querySelector("textarea");this.comment.content=(r==null?void 0:r.value)||"",this.renderComment(this.commentContainerEl)}})}loadReplies(){var e;(e=this.comment.replies)==null||e.map(n=>{const s=new l(this.currentUser,n);this.repliesContainerEl.appendChild(s.replyEl)})}showReplyPanel(){this.generateReplyPanel(),this.replyPanel&&(this.repliesContainerEl.insertAdjacentElement("beforebegin",this.replyPanel),this.replyPanel.addEventListener("submit",e=>{e.preventDefault();const n=e.target.text.value;this.addReply(n),this.removeReplyPanel(!0)}))}addReply(e){if(!e.length)return;e[0]=="@"&&(e=e.slice(e.indexOf(" ")+1));const n=this.generateNewReply(e,this.comment.user.username),s=new l(this.currentUser,n);this.repliesContainerEl.appendChild(s.replyEl),s.replyEl.classList.add("slideDown")}}class R{constructor(){o(this,"app");o(this,"currentUser");o(this,"comments");o(this,"respondEl");this.app=document.getElementById("app"),this.currentUser=d.currentUser,this.comments=d.comments,this.respondEl=h(this.currentUser,"Send"),this.respondEl.addEventListener("submit",t=>{t.preventDefault();const e=t.target,n=e.text.value;this.addComment(n),e.text.value=""}),this.app.appendChild(this.respondEl)}render(){this.comments.forEach(t=>{const e=new u(this.currentUser,t);this.app.insertBefore(e.commentEl,this.respondEl)})}addComment(t){if(!t.length)return;const e={id:Date.now(),user:this.currentUser,createdAt:"Just now",content:t,score:0,replies:[]},n=new u(this.currentUser,e);n.commentEl.classList.add("slideDown"),this.app.insertBefore(n.commentEl,this.respondEl)}}const x=new R;x.render();
