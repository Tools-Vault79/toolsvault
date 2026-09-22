/* ToolVault Universal Unlock System v1
   UX paywall for static MVP. Full enforcement requires server-side purchase verification.
*/
(function(){
  // Inject paywall styles so the lock overlay and purchase modal work on every tool.
  const css = `
/* ToolVault Universal Unlock System v1 - paywall UI */
.tv-modal{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;padding:20px}
.tv-modal.open{display:flex}
.tv-modal-backdrop{position:absolute;inset:0;background:rgba(2,6,23,.68);backdrop-filter:blur(3px)}
.tv-modal-card{position:relative;z-index:2;width:min(480px,100%);background:#fff;border:1px solid #E2E8F0;border-radius:18px;padding:30px;box-shadow:0 24px 80px rgba(2,6,23,.25);font-family:Inter,Arial,sans-serif;color:#0B1220;text-align:center}
.tv-modal-close{position:absolute;right:14px;top:10px;border:0;background:transparent;color:#64748B;font-size:28px;line-height:1;cursor:pointer}
.tv-lock{font-size:38px;margin-bottom:8px}
.tv-kicker{font-size:11px;font-weight:800;letter-spacing:.12em;color:#2563EB;margin-bottom:8px}
.tv-modal-card h2{font-family:"Space Grotesk",Inter,Arial,sans-serif;font-size:27px;line-height:1.2;margin:0 0 10px}
.tv-modal-card p{color:#64748B;font-size:14px;line-height:1.6;margin:0 0 18px}
.tv-benefits{display:grid;gap:8px;text-align:left;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:14px;margin:0 0 20px;font-size:13px;font-weight:600}
.tv-buy{display:block;background:#2563EB;color:#fff!important;text-decoration:none!important;border-radius:10px;padding:13px 16px;font-weight:800;font-size:14px}
.tv-buy:hover{background:#1D4ED8}
.tv-note{font-size:11px!important;color:#94A3B8!important;margin:12px 0 0!important}
body.tv-modal-open{overflow:hidden}
.tv-protected-output{position:relative!important;overflow:hidden!important}
.tv-output-mask{position:absolute;inset:0;z-index:10;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(248,250,252,.92);backdrop-filter:blur(4px);border-radius:inherit}
.tv-output-lock{width:min(360px,90%);background:#fff;border:1px solid #E2E8F0;border-radius:15px;padding:22px;text-align:center;box-shadow:0 12px 35px rgba(15,23,42,.10)}
.tv-output-lock span{display:block;font-size:28px;margin-bottom:8px}
.tv-output-lock strong{display:block;color:#0B1220;font-size:17px;margin-bottom:6px}
.tv-output-lock small{display:block;color:#64748B;font-size:12px;line-height:1.5;margin-bottom:14px}
.tv-output-lock button{border:0;border-radius:9px;background:#2563EB;color:#fff;padding:10px 14px;font-weight:800;cursor:pointer}
.tv-output-lock button:hover{background:#1D4ED8}
`;
  const style = document.createElement('style');
  style.id = 'toolvault-paywall-styles';
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);


  const cfg = window.TOOLVAULT_PAYWALL || {};
  const checkout = cfg.checkout || '#';
  const toolName = cfg.toolName || 'this ToolVault tool';

  function show(){
    let modal=document.getElementById('tvPaywallModal');
    if(!modal){
      modal=document.createElement('div');
      modal.id='tvPaywallModal';
      modal.className='tv-modal';
      modal.innerHTML=`
        <div class="tv-modal-backdrop"></div>
        <div class="tv-modal-card" role="dialog" aria-modal="true" aria-labelledby="tvPaywallTitle">
          <button class="tv-modal-close" aria-label="Close">×</button>
          <div class="tv-lock">🔒</div>
          <div class="tv-kicker">PREMIUM TOOL</div>
          <h2 id="tvPaywallTitle">Your result is ready to unlock</h2>
          <p>You've entered your information and tested the tool. The complete result is available with the purchased ToolVault version.</p>
          <div class="tv-benefits">
            <div>✓ Full result</div>
            <div>✓ Copy and download access</div>
            <div>✓ Use the complete tool</div>
            <div>✓ Personal/commercial workflow ready</div>
          </div>
          <a class="tv-buy" href="${checkout}" target="_blank" rel="noopener">Buy & Unlock Full Tool</a>
          <div class="tv-note">Checkout is securely handled by Gumroad.</div>
        </div>`;
      document.body.appendChild(modal);
      modal.querySelector('.tv-modal-backdrop').addEventListener('click', close);
      modal.querySelector('.tv-modal-close').addEventListener('click', close);
    }
    modal.classList.add('open');
    document.body.classList.add('tv-modal-open');
  }
  function close(){
    const m=document.getElementById('tvPaywallModal');
    if(m){m.classList.remove('open');document.body.classList.remove('tv-modal-open');}
  }
  window.ToolVaultPaywall={show,close};
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  document.addEventListener('DOMContentLoaded',()=>{
    // Lock visible output areas so results are never presented as free.
    const targets=[...document.querySelectorAll('.result, .invoice')];
    targets.forEach(target=>{
      target.classList.add('tv-protected-output');
      const mask=document.createElement('div');
      mask.className='tv-output-mask';
      mask.innerHTML='<div class="tv-output-lock"><span>🔒</span><strong>Full result locked</strong><small>Enter your values, then purchase to unlock the complete result.</small><button type="button">Unlock Full Result</button></div>';
      target.appendChild(mask);
      mask.querySelector('button').addEventListener('click',show);
    });
  });
})();