import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function getStateAndAddress(X, Y) {
  if (Y < 25 && X >= 20 && X <= 60) return { state: "Jammu & Kashmir", address: "Vill. Doodpathri, Near Frozen River, Tehsil Budgam, Pin: 193401, J&K" };
  if (Y < 25 && X > 60) return { state: "Arunachal Pradesh", address: "House No. Unknown, Tawang Hills, Near Chinese Border Marker 47, Pin: 790001, AR" };
  if (Y >= 25 && Y < 40 && X < 35) return { state: "Punjab", address: "Mohalla Sheherbaaz, Opp. Sona Atta Chakki, Near Overbridge, Ludhiana, Pin: 141001, Punjab" };
  if (Y >= 25 && Y < 40 && X >= 35 && X <= 65) return { state: "Uttar Pradesh", address: "Gali No. 7, Peeche Wala Mandir, Near Puraana Nalka, Prayagraj, Pin: 211001, UP" };
  if (Y >= 40 && Y < 60 && X < 30) return { state: "Rajasthan", address: "Sand Dune Colony, Sector Reti-4, Behind Abandoned Fort, Jaisalmer, Pin: 345001, Rajasthan" };
  if (Y >= 40 && Y < 60 && X >= 30 && X <= 55) return { state: "Madhya Pradesh", address: "Plot 13B, Jungle View Township, Phase 3 (Unplanned), Bhopal, Pin: 462001, MP" };
  if (Y >= 40 && Y < 60 && X > 55) return { state: "West Bengal / Odisha", address: "Cyclone Preparedness Nagar, Block C-Sea-Facing, Bhubaneswar, Pin: 751001, Odisha" };
  if (Y >= 60 && Y < 80 && X < 35) return { state: "Maharashtra / Goa", address: "Chawl No. 4, Room 12A, Dharavi Main Road, Near Footover, Mumbai, Pin: 400017, MH" };
  if (Y >= 60 && Y < 80 && X >= 35 && X <= 65) return { state: "Telangana / AP", address: "H.No. 5-4-889, Near Famous Biryani Stall (Closed), Hyderabad, Pin: 500001, TS" };
  if (Y >= 80) return { state: "Tamil Nadu / Kerala", address: "Coconut Tree Colony, Phase 3, Opp. Toddy Shop, Coimbatore, Pin: 641001, TN" };
  return { state: "Arabian Sea / Unknown", address: "Coordinates: 18.2°N, 68.4°E. Nearest land: Pakistan. Pin Code: N/A." };
}

export default function Screen2({
  pinPlaced, setPinPlaced,
  pinX, setPinX,
  pinY, setPinY,
  selectedState, setSelectedState,
  selectedAddress, setSelectedAddress,
  setCurrentStep, setClerkStep
}) {
  const pinRef = useRef(null);
  const mapRef = useRef(null);

  const handleMapClick = (e) => {
    if (pinPlaced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    const yPct = ((e.clientY - rect.top) / rect.height) * 100;
    setPinX(xPct);
    setPinY(yPct);
    setPinPlaced(true);

    const { state, address } = getStateAndAddress(xPct, yPct);
    setSelectedState(state);
    setSelectedAddress(address);

    // Animate pin drop
    setTimeout(() => {
      if (pinRef.current) {
        gsap.from(pinRef.current, { y: -40, opacity: 0, duration: 0.4, ease: "bounce.out" });
      }
    }, 50);
  };

  const isArabianSea = selectedState === "Arabian Sea / Unknown";

  return (
    <div>
      {/* Section header */}
      <div style={{ background: '#003366', color: 'white', padding: '8px 12px', fontFamily: 'Georgia, serif', fontSize: 14 }}>
        चरण 2: वितरण पता | Step 2 of 4: Delivery Address
        <div style={{ color: '#aaa', fontSize: 11, fontStyle: 'italic' }}>(Charan 2: Vitaran Pata — Delivery Address)</div>
      </div>

      <div style={{ padding: 12 }}>
        {/* Instructions */}
        <div style={{ color: '#cc0000', fontWeight: 'bold', fontSize: 14, marginBottom: 12, lineHeight: 1.6 }}>
          ⚠ सावधानी से पिन लगाएँ। (Savdhani se pin lagaen — Drop pin carefully.)<br />
          Click ONCE on the map to drop your delivery pin.<br />
          You get ONE chance only. No zoom. No undo. No mercy.<br />
          <span style={{ fontSize: 11 }}>The Government of India is not responsible for pins dropped in the ocean, on mountains, or in Pakistan.</span>
        </div>

        {/* Map */}
        <div
          ref={mapRef}
          onClick={handleMapClick}
          style={{
            width: '100%', height: 420,
            backgroundImage: "url('/maps/india.png')",
            backgroundSize: 'contain', backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            border: '3px solid #003366',
            cursor: pinPlaced ? 'default' : 'crosshair',
            position: 'relative', background: '#e8e5dd'
          }}
        >
          <img
            src="/maps/india.png"
            alt="India Map"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />

          {/* Pin */}
          {pinPlaced && pinX !== null && (
            <div ref={pinRef} style={{
              position: 'absolute', left: `${pinX}%`, top: `${pinY}%`,
              transform: 'translate(-50%, -100%)', fontSize: 24, pointerEvents: 'none',
              zIndex: 5
            }}>📍</div>
          )}
        </div>

        {/* After pin placed */}
        {pinPlaced && (
          <div style={{ marginTop: 12 }}>
            <div style={{ border: '1px solid #999', background: '#ece9d8', padding: 12, marginBottom: 8 }}>
              <div style={{ fontSize: 13 }}>📍 <b>Detected State:</b> {selectedState}</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>📮 <b>Delivery Address:</b> {selectedAddress}</div>
            </div>

            {isArabianSea && (
              <div style={{ color: '#cc0000', fontSize: 12, marginBottom: 8, fontWeight: 'bold' }}>
                ⚠ Note: Passport will be delivered by boat. Additional nautical handling fee of ₹4,200 applicable. ETA: Subject to monsoon season.
              </div>
            )}

            <div style={{ background: '#fff3cd', border: '1px solid #ffc107', padding: 10, fontSize: 12, marginBottom: 12 }}>
              ⚠ Address Lock Warning: Once confirmed, this delivery address cannot be changed for 14 (fourteen) working years. Please ensure your pin landed in the correct state and not the Bay of Bengal.
            </div>

            <button className="govt-btn" style={{ width: '100%', fontSize: 16 }}
              onClick={() => setClerkStep(1)}>
              CONFIRM THIS ADDRESS → (Pata Confirm Karen)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
