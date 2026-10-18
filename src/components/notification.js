/**
 * Elif Kimya - Bildirim (Toast) ve Güvenli Onay Modalı Yöneticisi
 * innerHTML veya native alert/confirm/prompt kullanmadan güvenli DOM oluşturur.
 */

export function showToast(message, type = 'info', duration = 4500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'notification-container';
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;

  const iconSpan = document.createElement('span');
  iconSpan.className = 'toast-icon';
  iconSpan.textContent = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';

  const contentDiv = document.createElement('div');
  contentDiv.className = 'toast-content';
  contentDiv.textContent = String(message || '');

  const closeBtn = document.createElement('button');
  closeBtn.className = 'toast-close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label', 'Kapat');
  closeBtn.textContent = '×';

  closeBtn.addEventListener('click', () => {
    toast.classList.add('toast-hide');
    setTimeout(() => toast.remove(), 250);
  });

  toast.appendChild(iconSpan);
  toast.appendChild(contentDiv);
  toast.appendChild(closeBtn);
  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentElement) {
      toast.classList.add('toast-hide');
      setTimeout(() => toast.remove(), 250);
    }
  }, duration);
}

export const showNotification = showToast;

/**
 * Native confirm() yerine kullanılan, ana iş parçacığını bloklamayan kurumsal onay modalı.
 */
export function showConfirmModal({ title = 'İşlemi Onayla', message = 'Devam etmek istiyor musunuz?', confirmText = 'Onayla', cancelText = 'Vazgeç', danger = false }) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const dialog = document.createElement('div');
    dialog.className = 'modal-dialog';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');

    const titleEl = document.createElement('h3');
    titleEl.className = 'modal-title';
    titleEl.textContent = title;

    const msgEl = document.createElement('p');
    msgEl.className = 'modal-message';
    msgEl.textContent = message;

    const actions = document.createElement('div');
    actions.className = 'modal-actions';

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'button button-ghost-dark button-small';
    cancelBtn.textContent = cancelText;

    const confirmBtn = document.createElement('button');
    confirmBtn.type = 'button';
    confirmBtn.className = `button ${danger ? 'button-danger' : 'button-primary'} button-small`;
    confirmBtn.textContent = confirmText;

    const cleanup = (result) => {
      overlay.remove();
      resolve(result);
    };

    cancelBtn.addEventListener('click', () => cleanup(false));
    confirmBtn.addEventListener('click', () => cleanup(true));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) cleanup(false);
    });

    actions.appendChild(cancelBtn);
    actions.appendChild(confirmBtn);
    dialog.appendChild(titleEl);
    dialog.appendChild(msgEl);
    dialog.appendChild(actions);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);
  });
}
