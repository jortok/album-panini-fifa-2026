    const STORAGE_KEY = 'panini2026_stickers_v2';
    const DATA_FILE = 'data/panini-2026-data.json';
    let fileHandle = null;

    const GROUP_COLORS = {
      'A': 'from-red-500 to-red-600',
      'B': 'from-blue-400 to-blue-500',
      'C': 'from-green-500 to-green-600',
      'D': 'from-purple-500 to-purple-600',
      'E': 'from-orange-400 to-orange-500',
      'F': 'from-teal-400 to-teal-500',
      'G': 'from-pink-500 to-pink-600',
      'H': 'from-cyan-500 to-cyan-600',
      'I': 'from-lime-500 to-lime-600',
      'J': 'from-orange-600 to-orange-700',
      'K': 'from-slate-500 to-slate-600',
      'L': 'from-stone-500 to-stone-600'
    };

    const PRINT_COLORS = {
      'A': '#ef4444', 'B': '#60a5fa', 'C': '#22c55e', 'D': '#a855f7',
      'E': '#fb923c', 'F': '#2dd4bf', 'G': '#ec4899', 'H': '#06b6d4',
      'I': '#84cc16', 'J': '#ea580c', 'K': '#64748b', 'L': '#78716c',
      'FWC': 'linear-gradient(to right, #003399, #1e40af)',
      'CC': 'linear-gradient(to right, #D6001C, #991b1b)'
    };

    const groups = [
      { name: 'A', countries: [{ code: 'MEX', name: 'México', flag: 'mx' }, { code: 'RSA', name: 'Sudáfica', flag: 'za' }, { code: 'KOR', name: 'Corea Sur', flag: 'kr' }, { code: 'CZE', name: 'Rep. Checa', flag: 'cz' }] },
      { name: 'B', countries: [{ code: 'CAN', name: 'Canadá', flag: 'ca' }, { code: 'BIH', name: 'Bosnia', flag: 'ba' }, { code: 'QAT', name: 'Catar', flag: 'qa' }, { code: 'SUI', name: 'Suiza', flag: 'ch' }] },
      { name: 'C', countries: [{ code: 'BRA', name: 'Brasil', flag: 'br' }, { code: 'MAR', name: 'Marruecos', flag: 'ma' }, { code: 'HAI', name: 'Haití', flag: 'ht' }, { code: 'SCO', name: 'Escocia', flag: 'gb-sct' }] },
      { name: 'D', countries: [{ code: 'USA', name: 'EEUU', flag: 'us' }, { code: 'PAR', name: 'Paraguay', flag: 'py' }, { code: 'AUS', name: 'Australia', flag: 'au' }, { code: 'TUR', name: 'Turquía', flag: 'tr' }] },
      { name: 'E', countries: [{ code: 'GER', name: 'Alemania', flag: 'de' }, { code: 'CUR', name: 'Curazao', flag: 'cw' }, { code: 'CIV', name: 'C. Marfil', flag: 'ci' }, { code: 'ECU', name: 'Ecuador', flag: 'ec' }] },
      { name: 'F', countries: [{ code: 'NED', name: 'P. Bajos', flag: 'nl' }, { code: 'JPN', name: 'Japón', flag: 'jp' }, { code: 'SWE', name: 'Suecia', flag: 'se' }, { code: 'TUN', name: 'Túnez', flag: 'tn' }] },
      { name: 'G', countries: [{ code: 'BEL', name: 'Bélgica', flag: 'be' }, { code: 'EGY', name: 'Egipto', flag: 'eg' }, { code: 'IRN', name: 'Irán', flag: 'ir' }, { code: 'NZL', name: 'N. Zelanda', flag: 'nz' }] },
      { name: 'H', countries: [{ code: 'ESP', name: 'España', flag: 'es' }, { code: 'CPV', name: 'Cabo Verde', flag: 'cv' }, { code: 'KSA', name: 'Arabia', flag: 'sa' }, { code: 'URU', name: 'Uruguay', flag: 'uy' }] },
      { name: 'I', countries: [{ code: 'FRA', name: 'Francia', flag: 'fr' }, { code: 'SEN', name: 'Senegal', flag: 'sn' }, { code: 'IRQ', name: 'Irak', flag: 'iq' }, { code: 'NOR', name: 'Noruega', flag: 'no' }] },
      { name: 'J', countries: [{ code: 'ARG', name: 'Argentina', flag: 'ar' }, { code: 'ALG', name: 'Argelia', flag: 'dz' }, { code: 'AUT', name: 'Austria', flag: 'at' }, { code: 'JOR', name: 'Jordania', flag: 'jo' }] },
      { name: 'K', countries: [{ code: 'POR', name: 'Portugal', flag: 'pt' }, { code: 'COD', name: 'R.D. Congo', flag: 'cd' }, { code: 'UZB', name: 'Uzbekist.', flag: 'uz' }, { code: 'COL', name: 'Colombia', flag: 'co' }] },
      { name: 'L', countries: [{ code: 'ENG', name: 'Inglaterra', flag: 'gb-eng' }, { code: 'CRO', name: 'Croacia', flag: 'hr' }, { code: 'GHA', name: 'Ghana', flag: 'gh' }, { code: 'PAN', name: 'Panamá', flag: 'pa' }] }
    ];

    const specialGroups = [
      { name: 'FWC', code: 'FWC', nameFull: 'Fifa World Cup', count: 19, startIndex: 0, gradient: 'from-[#003399] to-blue-800' },
      { name: 'CC', code: 'CC', nameFull: 'Coca-Cola', count: 14, startIndex: 1, gradient: 'from-[#D6001C] to-red-800' }
    ];

    let stickers = {};

    const TOTAL_STICKERS = 994;

    // IndexedDB helper to store file handle
    const DB_NAME = 'panini_tracker_db';
    const STORE_NAME = 'file_handles';
    const HANDLE_KEY = 'current_file_handle';

    function openDB() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = (e) => {
          e.target.result.createObjectStore(STORE_NAME);
        };
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject(e.target.error);
      });
    }

    async function storeFileHandle(handle) {
      try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(handle, HANDLE_KEY);
        await new Promise((resolve, reject) => {
          tx.oncomplete = resolve;
          tx.onerror = () => reject(tx.error);
        });
      } catch (e) {
        console.warn('Failed to store file handle in IndexedDB:', e);
      }
    }

    async function getStoredFileHandle() {
      try {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, 'readonly');
        const request = tx.objectStore(STORE_NAME).get(HANDLE_KEY);
        return await new Promise((resolve, reject) => {
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });
      } catch (e) {
        console.warn('Failed to retrieve file handle from IndexedDB:', e);
        return null;
      }
    }

    function ensureAllStickersExist() {
      groups.forEach(g => g.countries.forEach(c => {
        for (let i = 1; i <= 20; i++) {
          const id = `${c.code}${i}`;
          if (stickers[id] === undefined) stickers[id] = false;
        }
      }));
      specialGroups.forEach(sg => {
        const start = sg.startIndex !== undefined ? sg.startIndex : 1;
        for (let i = start; i <= sg.count; i++) {
          const id = `${sg.code}${i}`;
          if (stickers[id] === undefined) stickers[id] = false;
        }
      });
    }

    async function loadData() {
      // 1. Try to load from localStorage first
      let localStickers = null;
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          localStickers = JSON.parse(saved);
        } catch (e) {
          console.error('Error parsing localStorage:', e);
        }
      }

      // 2. Try to fetch from relative path (same directory as HTML)
      let fetchedStickers = null;
      try {
        const response = await fetch(DATA_FILE);
        if (response.ok) {
          const text = await response.text();
          fetchedStickers = JSON.parse(text);
        }
      } catch (e) {
        console.warn('Could not fetch ' + DATA_FILE + ', trying IndexedDB/localStorage:', e);
      }

      // 3. Try to get handle from IndexedDB
      let indexedStickers = null;
      try {
        const storedHandle = await getStoredFileHandle();
        if (storedHandle) {
          if (await storedHandle.queryPermission({ mode: 'readwrite' }) === 'granted') {
            fileHandle = storedHandle;
            const file = await fileHandle.getFile();
            const text = await file.text();
            indexedStickers = JSON.parse(text);
          }
        }
      } catch (e) {
        console.warn('IndexedDB handle load failed:', e);
      }

      // 4. Resolve conflicts using timestamps (or size if timestamps are missing/equal)
      const candidates = [localStickers, fetchedStickers, indexedStickers].filter(Boolean);

      if (candidates.length > 0) {
        candidates.sort((a, b) => {
          const aTime = a.lastUpdated || 0;
          const bTime = b.lastUpdated || 0;
          if (aTime !== bTime) {
            return bTime - aTime; // descending (newest first)
          }
          // fallback to counting owned stickers (true values)
          const aCount = Object.values(a).filter(v => v === true).length;
          const bCount = Object.values(b).filter(v => v === true).length;
          return bCount - aCount;
        });

        stickers = candidates[0];
        ensureAllStickersExist();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stickers));
      } else {
        resetData(false);
      }
    }

    function showToast(message, type = 'success') {
      const existing = document.getElementById('toast-notification');
      if (existing) {
        existing.remove();
      }

      const toast = document.createElement('div');
      toast.id = 'toast-notification';
      
      const bgColor = type === 'success' ? 'bg-emerald-600' : 'bg-red-600';
      toast.className = `fixed bottom-4 right-4 z-50 text-white px-4 py-2.5 rounded-lg shadow-lg ${bgColor} flex items-center gap-2 transition-all duration-300 transform translate-y-10 opacity-0 font-medium text-sm`;
      
      let icon = '';
      if (type === 'success') {
        icon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
      } else {
        icon = `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
      }
      
      toast.innerHTML = `${icon}<span>${message}</span>`;
      document.body.appendChild(toast);
      
      setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
      }, 50);

      setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }

    async function saveData() {
      try {
        if (fileHandle) {
          const writable = await fileHandle.createWritable();
          await writable.write(JSON.stringify(stickers));
          await writable.close();
          return true;
        }
      } catch (e) {
        console.warn('Auto-save to file failed, saving to localStorage:', e);
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stickers));
      } catch (e) {
        console.warn('Saving to localStorage failed:', e);
      }
      return false;
    }

    async function saveDataAs() {
      try {
        if ('showSaveFilePicker' in window) {
          const handle = await window.showSaveFilePicker({
            suggestedName: DATA_FILE,
            types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }]
          });
          fileHandle = handle;
          await storeFileHandle(fileHandle);
          const saved = await saveData();
          if (saved) {
            showToast('Progreso guardado en el archivo correctamente');
          }
        } else {
          // Fallback: download via anchor tag
          const blob = new Blob([JSON.stringify(stickers, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = DATA_FILE;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          showToast('Archivo de progreso descargado correctamente');
        }
      } catch (e) {
        if (e.name !== 'AbortError') {
          showToast('No se pudo guardar el archivo', 'error');
        }
      }
    }

    async function openFile() {
      try {
        if ('showOpenFilePicker' in window) {
          const [handle] = await window.showOpenFilePicker({
            types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }]
          });
          fileHandle = handle;
          await storeFileHandle(fileHandle);
          const file = await fileHandle.getFile();
          const text = await file.text();
          stickers = JSON.parse(text);
          ensureAllStickersExist();
          if (!stickers.lastUpdated) {
            stickers.lastUpdated = Date.now();
          }
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(stickers));
          } catch (se) {
            console.warn('LocalStorage save failed:', se);
          }
          render();
          showToast('Progreso cargado desde el archivo correctamente');
        } else {
          // Fallback for browsers that don't support showOpenFilePicker (like Firefox, Safari, mobile, or file://)
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = '.json';
          input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            try {
              const text = await file.text();
              stickers = JSON.parse(text);
              ensureAllStickersExist();
              if (!stickers.lastUpdated) {
                stickers.lastUpdated = Date.now();
              }
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(stickers));
              } catch (se) {
                console.warn('LocalStorage save failed:', se);
              }
              render();
              showToast('Progreso cargado desde el archivo correctamente');
            } catch (err) {
              showToast('Error al leer el archivo JSON: ' + err.message, 'error');
            }
          };
          input.click();
        }
      } catch (e) {
        if (e.name !== 'AbortError') {
          showToast('No se pudo abrir el archivo', 'error');
        }
      }
    }

    async function saveFile() {
      let savedToFile = false;

      if (!fileHandle) {
        try {
          const storedHandle = await getStoredFileHandle();
          if (storedHandle) {
            if (await storedHandle.requestPermission({ mode: 'readwrite' }) === 'granted') {
              fileHandle = storedHandle;
            }
          }
        } catch (e) {
          console.warn('Could not restore file handle from IndexedDB:', e);
        }
      }

      if (fileHandle) {
        try {
          if (await fileHandle.queryPermission({ mode: 'readwrite' }) !== 'granted') {
            if (await fileHandle.requestPermission({ mode: 'readwrite' }) !== 'granted') {
              fileHandle = null;
            }
          }
        } catch (e) {
          fileHandle = null;
        }
      }

      if (fileHandle) {
        savedToFile = await saveData();
        if (savedToFile) {
          showToast('Progreso guardado en el archivo correctamente');
        } else {
          // If save failed even with handle, fallback to saveDataAs
          await saveDataAs();
        }
      } else {
        await saveDataAs();
      }
    }

    function init() {
      loadData().then(render);
    }

    function resetData(shouldRender = true) {
      stickers = {};
      groups.forEach(g => g.countries.forEach(c => {
        for (let i = 1; i <= 20; i++) stickers[`${c.code}${i}`] = false;
      }));
      specialGroups.forEach(sg => {
        const start = sg.startIndex !== undefined ? sg.startIndex : 1;
        for (let i = start; i <= sg.count; i++) stickers[`${sg.code}${i}`] = false;
      });
      stickers.lastUpdated = Date.now();
      saveData();
      if(shouldRender) render();
    }

    function save() {
      saveData();
    }

    function toggle(id, sectionId) {
      stickers[id] = !stickers[id];
      stickers.lastUpdated = Date.now();
      saveData();
      
      const btn = document.getElementById(`btn-${id}`);
      if (btn) {
        if (stickers[id]) {
          btn.classList.add('bg-blue-600', 'text-white', 'border-blue-700', 'sticker-filled');
          btn.classList.remove('bg-slate-50', 'text-slate-500', 'border-slate-200');
        } else {
          btn.classList.remove('bg-blue-600', 'text-white', 'border-blue-700', 'sticker-filled');
          btn.classList.add('bg-slate-50', 'text-slate-500', 'border-slate-200');
        }
      }
      
      updateCounter(sectionId);
      updateStats();
    }

    function updateCounter(sectionId) {
      let total = 0, count = 0;
      
      if (sectionId.startsWith('sp-')) {
        const spCode = sectionId.split('-')[1];
        const sg = specialGroups.find(s => s.code === spCode);
        const start = sg.startIndex !== undefined ? sg.startIndex : 1;
        total = sg.count - start + 1;
        for(let i=start; i<=sg.count; i++) if(stickers[`${spCode}${i}`]) count++;
      } else {
        total = 20;
        for(let i=1; i<=total; i++) if(stickers[`${sectionId}${i}`]) count++;
      }
      
      const el = document.getElementById(`count-${sectionId}`);
      if(el) el.textContent = `${count}/${total}`;
    }

    function updateStats() {
      const owned = Object.values(stickers).filter(Boolean).length;
      const percent = Math.round((owned / TOTAL_STICKERS) * 100);
      
      document.getElementById('stat-owned').textContent = owned;
      document.getElementById('stat-percent').textContent = percent + '%';
      document.getElementById('progress-fill').style.width = percent + '%';
    }

    function render() {
      const container = document.getElementById('album');
      let html = '';

      groups.forEach(group => {
        html += `
          <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden print-card">
            <div class="bg-gradient-to-r ${GROUP_COLORS[group.name]} text-white p-2 md:p-3 flex justify-between items-center print:bg-none print:text-black print:border-b print:border-slate-300">
              <h3 class="font-black text-lg print:text-xs">GRUPO ${group.name}</h3>
            </div>
            <div class="divide-y divide-slate-100">
        `;
        
        group.countries.forEach(country => {
          html += `
            <div class="p-3 country-row">
              <div class="flex items-center justify-between mb-2">
                <div class="flex items-center gap-2">
                  <img src="https://flagcdn.com/24x18/${country.flag}.png" alt="${country.name}" class="w-6 h-auto rounded-sm shadow-sm flag-img">
                  <span class="font-bold text-slate-800 print:text-[8px]">${country.name}</span>
                  <span class="text-xs font-mono bg-slate-100 text-slate-500 px-1 rounded print:hidden">${country.code}</span>
                </div>
                <span id="count-${country.code}" class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full print-hide">0/20</span>
              </div>
              <div class="grid grid-cols-10 gap-1 mt-2 print:grid-cols-10">
          `;
          
          for (let i = 1; i <= 20; i++) {
            const id = `${country.code}${i}`;
            const filled = stickers[id];
            const cls = filled 
              ? 'bg-blue-600 text-white border-blue-700 sticker-filled' 
              : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100';
            const nameTooltip = STICKER_NAMES[id] ? ` - ${STICKER_NAMES[id]}` : '';
              
            html += `<button id="btn-${id}" onclick="toggle('${id}', '${country.code}')" class="sticker-btn border rounded aspect-square flex items-center justify-center text-[10px] sm:text-xs font-semibold transition-colors ${cls}" title="${id}${nameTooltip}">${i}</button>`;
          }
          
          html += `</div></div>`;
        });
        
        html += `</div></div>`;
      });

      specialGroups.forEach(sg => {
        const start = sg.startIndex !== undefined ? sg.startIndex : 1;
        const total = sg.count - start + 1;
        html += `
          <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden print-card">
            <div class="bg-gradient-to-r ${sg.gradient} text-white p-2 md:p-3 flex justify-between items-center print:bg-none print:text-black print:border-b print:border-slate-300">
              <h3 class="font-black text-sm md:text-base print:text-xs uppercase">${sg.nameFull}</h3>
              <span id="count-sp-${sg.code}" class="text-xs font-bold bg-white/20 px-2 py-0.5 rounded-full print-hide">0/${total}</span>
            </div>
            <div class="p-3 country-row">
              <div class="grid grid-cols-10 gap-1 print:grid-cols-10">
        `;
        
        for (let i = start; i <= sg.count; i++) {
          const id = `${sg.code}${i}`;
          const filled = stickers[id];
          const cls = filled 
            ? 'bg-blue-600 text-white border-blue-700 sticker-filled' 
            : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100';
          const nameTooltip = STICKER_NAMES[id] ? ` - ${STICKER_NAMES[id]}` : '';
            
          html += `<button id="btn-${id}" onclick="toggle('${id}', 'sp-${sg.code}')" class="sticker-btn border rounded aspect-square flex items-center justify-center text-[10px] sm:text-xs font-semibold transition-colors ${cls}" title="${id}${nameTooltip}">${i}</button>`;
        }
        
        html += `</div></div></div>`;
      });

      container.innerHTML = html;

      groups.forEach(g => g.countries.forEach(c => updateCounter(c.code)));
      specialGroups.forEach(sg => updateCounter(`sp-${sg.code}`));
      updateStats();
      updateMissingList();
    }

    const modal = document.getElementById('reset-modal');
    const modalContent = document.getElementById('reset-modal-content');

    function showResetModal() {
      modal.classList.remove('hidden');
      setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
      }, 10);
    }

    function hideResetModal() {
      modalContent.classList.remove('scale-100', 'opacity-100');
      modalContent.classList.add('scale-95', 'opacity-0');
      setTimeout(() => modal.classList.add('hidden'), 200);
    }

    function confirmReset() {
      resetData();
      hideResetModal();
      showToast('Se ha reiniciado el progreso de tu colección', 'success');
    }

    function updateMissingList() {
      const missingContainer = document.getElementById('missing-list-container');
      if (!missingContainer) return;

      const allMissing = Object.keys(stickers).filter(id => id !== 'lastUpdated' && !stickers[id]);
      if (allMissing.length === 0) {
        missingContainer.innerHTML = `
          <div class="missing-list-header">
            <div class="missing-list-header-left">
              <img src="img/World-Cup-2026-Logo.png" alt="FIFA 2026" class="logo">
              <h1 class="title">Stickers Faltantes - Panini 2026</h1>
            </div>
            <p class="stats">¡Felicidades! No te falta ningún sticker.</p>
          </div>
        `;
        return;
      }

      let html = `
        <div class="missing-list-header">
          <div class="missing-list-header-left">
            <img src="img/World-Cup-2026-Logo.png" alt="FIFA 2026" class="logo">
            <h1 class="title">Stickers Faltantes - Panini 2026</h1>
          </div>
          <p class="stats">Total Faltantes: <strong>${allMissing.length}</strong> de ${TOTAL_STICKERS}</p>
        </div>
        <div class="missing-groups-grid">
      `;

      // Process regular groups
      groups.forEach(group => {
        let groupHtml = '';
        let totalMissingInGroup = 0;

        group.countries.forEach(country => {
          const missingInCountry = [];
          for (let i = 1; i <= 20; i++) {
            const id = `${country.code}${i}`;
            if (!stickers[id]) missingInCountry.push(id);
          }

          if (missingInCountry.length > 0) {
            totalMissingInGroup += missingInCountry.length;
            groupHtml += `<div class="missing-country-block">
              <div class="missing-country-header">
                <img src="https://flagcdn.com/24x18/${country.flag}.png" class="flag-img" alt="${country.name}">
                <span>${country.name}</span>
              </div>
              <div class="missing-list-grid">`;
            missingInCountry.sort((a, b) => a.localeCompare(b, undefined, {numeric: true})).forEach(id => {
              const num = id.replace(country.code, '');
              const pName = STICKER_NAMES[id] || '';
              groupHtml += `<div class="missing-sticker-box" title="${id}${pName ? ' - ' + pName : ''}">${num}</div>`;
            });
            groupHtml += `</div></div>`;
          }
        });

        if (totalMissingInGroup > 0) {
          html += `<div class="missing-group-card">
            <div class="missing-group-watermark">${group.name}</div>
            <div class="missing-group-content">${groupHtml}</div>
          </div>`;
        }
      });

      // Process special groups
      specialGroups.forEach(sg => {
        const start = sg.startIndex !== undefined ? sg.startIndex : 1;
        const missingInGroup = [];
        for (let i = start; i <= sg.count; i++) {
          const id = `${sg.code}${i}`;
          if (!stickers[id]) missingInGroup.push(id);
        }

        if (missingInGroup.length > 0) {
          html += `<div class="missing-group-card">
            <div class="missing-group-watermark">${sg.code}</div>
            <div class="missing-group-content">
              <div class="missing-list-grid special-list-grid">`;
          missingInGroup.sort((a, b) => a.localeCompare(b, undefined, {numeric: true})).forEach(id => {
            const num = id.replace(sg.code, '');
            const pName = STICKER_NAMES[id] || '';
            html += `<div class="missing-sticker-box" title="${id}${pName ? ' - ' + pName : ''}">${num}</div>`;
          });
          html += `</div></div></div>`;
        }
      });

      html += `</div>`;
      missingContainer.innerHTML = html;
    }

    init();
