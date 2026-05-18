import React from 'react';

export function LeftSidebar() {
  return (
    <div style={{ width: 200, minWidth: 200, padding: 6 }}>
      {/* Quick Stats */}
      <div className="sidebar-box">
        <div className="sidebar-box-header">
          त्वरित आँकड़े
          <div style={{ fontSize: 9, color: '#aaa', fontStyle: 'italic', fontWeight: 'normal' }}>
            (Quick Stats)
          </div>
        </div>
        <div className="sidebar-box-body">
          <div>कुल सदस्य: <b>1,20,04,891</b></div>
          <div>आज के आवेदन: <b>4,29,112</b></div>
          <div>सफल निष्पादन: <b style={{ color: '#cc0000' }}>0</b></div>
        </div>
      </div>

      {/* System Messages */}
      <div className="sidebar-box">
        <div className="sidebar-box-header">
          सिस्टम संदेश
          <div style={{ fontSize: 9, color: '#aaa', fontStyle: 'italic', fontWeight: 'normal' }}>
            (System Messages)
          </div>
        </div>
        <div className="sidebar-box-body">
          <div>⚠ 0 नई सूचना</div>
          <div>⚠ 2 अपठित संदेश</div>
          <div>⚠ 0 अलर्ट</div>
        </div>
      </div>
    </div>
  );
}

export function RightSidebar() {
  return (
    <div style={{ width: 220, minWidth: 220, padding: 6 }}>
      {/* Important Notice */}
      <div className="sidebar-box">
        <div className="sidebar-box-header">
          महत्वपूर्ण सूचना
          <div style={{ fontSize: 9, color: '#aaa', fontStyle: 'italic', fontWeight: 'normal' }}>
            (Important Notice)
          </div>
        </div>
        <div className="sidebar-box-body" style={{ fontSize: 10 }}>
          <ul style={{ paddingLeft: 14, margin: 0 }}>
            <li>Do not refresh the page or data will be lost</li>
            <li>Use only Black or Blue ink (for digital forms)</li>
            <li>All fields are mandatory including optional ones</li>
            <li>Government is not liable for any errors caused by you</li>
          </ul>
        </div>
      </div>

      {/* Tips */}
      <div className="sidebar-box">
        <div className="sidebar-box-header" style={{ background: '#2e7d32' }}>
          सुझाव (TIPS)
        </div>
        <div className="sidebar-box-body" style={{ background: '#e8f5e9', fontSize: 10 }}>
          <ul style={{ paddingLeft: 14, margin: 0 }}>
            <li>Save your application ID somewhere safe</li>
            <li>Chai fund improves processing speed by 6000%</li>
          </ul>
        </div>
      </div>

      {/* Beta Warning */}
      <div className="sidebar-box">
        <div className="sidebar-box-header" style={{ background: '#e65100' }}>
          <span className="blink-anim">⚠ BETA VERSION</span>
        </div>
        <div className="sidebar-box-body" style={{ background: '#fff3e0', fontSize: 10 }}>
          Yeh ek Beta version hai. Sabhi bugs ki jaankari hamein dein.
        </div>
      </div>
    </div>
  );
}
