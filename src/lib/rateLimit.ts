const _0x1 = 'stage_rate_limit_';
const _0x2 = 10;
const _0x3 = 5 * 60 * 1000;

interface _0x4 {
  _0x5: number;
  _0x6: number;
}

export function _0x7(stageId: number): void {
  if (typeof window === 'undefined') return;
  
  const _0x8 = _0x1 + stageId;
  const _0x9 = localStorage.getItem(_0x8);
  const _0xa = Date.now();
  
  let _0xb: _0x4;
  
  if (_0x9) {
    _0xb = JSON.parse(_0x9);
    
    if (_0xa - _0xb._0x6 > _0x3) {
      _0xb = { _0x5: 1, _0x6: _0xa };
    } else {
      if (_0xb._0x5 >= _0x2) {
        const _0xc = Math.ceil((_0x3 - (_0xa - _0xb._0x6)) / 1000);
        throw new Error(`Too many attempts. Wait ${_0xc} seconds.`);
      }
      _0xb._0x5++;
    }
  } else {
    _0xb = { _0x5: 1, _0x6: _0xa };
  }
  
  localStorage.setItem(_0x8, JSON.stringify(_0xb));
}

export function _0xd(stageId: number): void {
  if (typeof window === 'undefined') return;
  const _0x8 = _0x1 + stageId;
  localStorage.removeItem(_0x8);
}

