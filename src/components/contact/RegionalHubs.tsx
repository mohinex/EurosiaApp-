import React, { useState } from 'react';
import { 
  MapPin, Phone, PhoneCall, Mail, Clock, ExternalLink, 
  MessageSquare, Copy, Check, ShieldCheck, HelpCircle,
  Navigation, Share2
} from 'lucide-react';
import { CONTACT_OFFICES, ContactOffice } from '../../data/contactOffices.ts';

export default function RegionalHubs() {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [offices, setOffices] = useState<ContactOffice[]>(CONTACT_OFFICES);

  React.useEffect(() => {
    fetch('/api/contacts')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Failed to load live contacts");
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setOffices(data);
        }
      })
      .catch(err => {
        console.warn("Using offline pre-cached contact offices dataset:", err);
      });
  }, []);

  const activeOffices = offices.filter(office => office.status === 'active');

  const handleCopyText = (key: string, textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  return (
    <div className="space-y-8" id="regional-hubs-container">
      <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
        <h4 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF3D4F] animate-pulse"></span>
          Active Regional Hubs
        </h4>
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          ONLINE TRUNKS
        </span>
      </div>

      <div className="grid gap-6">
        {activeOffices.map((office) => {
          const joinedAddress = office.addressLines.join(', ');
          const displayPhoneString = office.phones.join(', ');

          return (
            <div 
              key={office.id} 
              className="bg-[#05051B] border border-zinc-900/80 p-6 rounded-2xl relative text-left transition-all duration-305 hover:border-zinc-800 hover:shadow-2xl hover:shadow-[#FF3D4F]/5 group"
              id={`office-${office.id}`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#FF3D4F]/5 to-transparent rounded-tr-2xl filter blur-xl opacity-60 pointer-events-none"></div>
              
              {/* Country Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono font-extrabold text-[#FF3D4F] bg-[#FF3D4F]/10 border border-[#FF3D4F]/25 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                  {office.label}
                </span>
                <span className="text-[9px] font-mono text-zinc-500 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Node Linked
                </span>
              </div>

              {/* Title */}
              <h5 className="font-black text-base text-white uppercase tracking-tight mb-4 group-hover:text-[#FF3D4F] transition-colors">
                {office.title}
              </h5>

              {/* Data Content */}
              <div className="space-y-4 text-xs font-semibold">
                
                {/* 1. Address Section */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest font-bold">PHYSICAL COORDINATES</span>
                    <button 
                      onClick={() => handleCopyText(`${office.id}-address`, joinedAddress)}
                      className="text-zinc-500 hover:text-white transition-colors p-1 flex items-center gap-1 text-[9px] font-mono cursor-pointer"
                      title="Copy Address"
                      id={`copy-address-${office.id}`}
                    >
                      {copiedStates[`${office.id}-address`] ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">COPIED!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>COPY ADDRESS</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="p-3 bg-zinc-950/60 border border-zinc-900 rounded-xl flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#FF3D4F] shrink-0 mt-0.5" />
                    <div className="text-zinc-300 space-y-0.5 font-light text-[11px] leading-relaxed">
                      {office.addressLines.map((line, lIdx) => (
                        <p key={lIdx}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Communication Portals */}
                <div className="space-y-2">
                  <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest font-bold block">CONNECTION PORTS</span>
                  
                  <div className="grid gap-2 text-[11px]">
                    {/* Phone calls */}
                    {office.phones.map((phone, pIdx) => (
                      <div key={pIdx} className="flex items-center justify-between p-2.5 bg-zinc-950/40 border border-zinc-900/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <PhoneCall className="w-3.5 h-3.5 text-zinc-500" />
                          <span className="text-zinc-500 font-mono text-[10px] uppercase font-bold">Mobile:</span>
                          <a href={`tel:${phone}`} className="text-white hover:text-[#FF3D4F] hover:underline transition-all">
                            {phone}
                          </a>
                        </div>
                        <button
                          onClick={() => handleCopyText(`${office.id}-phone-${pIdx}`, phone)}
                          className="text-zinc-600 hover:text-white transition-colors cursor-pointer"
                          title="Copy Mobile"
                        >
                          {copiedStates[`${office.id}-phone-${pIdx}`] ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    ))}

                    {/* Telephones (Landlines) */}
                    {office.telephones && office.telephones.map((tel, tIdx) => (
                      <div key={tIdx} className="flex items-center justify-between p-2.5 bg-zinc-950/40 border border-zinc-900/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-zinc-500" />
                          <span className="text-zinc-500 font-mono text-[10px] uppercase font-bold">Tel:</span>
                          <a href={`tel:${tel}`} className="text-white hover:text-[#FF3D4F] hover:underline transition-all">
                            {tel}
                          </a>
                        </div>
                        <button
                          onClick={() => handleCopyText(`${office.id}-tel-${tIdx}`, tel)}
                          className="text-zinc-600 hover:text-white transition-colors cursor-pointer"
                          title="Copy Telephone"
                        >
                          {copiedStates[`${office.id}-tel-${tIdx}`] ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    ))}

                    {/* Hotline */}
                    {office.hotline && (
                      <div className="flex items-center justify-between p-2.5 bg-zinc-950/40 border border-zinc-900/50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <PhoneCall className="w-3.5 h-3.5 text-[#FF3D4F]" />
                          <span className="text-[#FF3D4F] font-mono text-[10px] uppercase font-bold">Hotline:</span>
                          <a href={`tel:${office.hotline}`} className="text-white hover:text-[#FF3D4F] font-bold hover:underline transition-all font-mono">
                            {office.hotline}
                          </a>
                        </div>
                        <button
                          onClick={() => handleCopyText(`${office.id}-hotline`, office.hotline || '')}
                          className="text-zinc-600 hover:text-white transition-colors cursor-pointer"
                          title="Copy Hotline"
                        >
                          {copiedStates[`${office.id}-hotline`] ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}

                    {/* Electronic Coordinates Email */}
                    <div className="flex items-center justify-between p-2.5 bg-zinc-950/40 border border-zinc-900/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-zinc-500" />
                        <span className="text-zinc-500 font-mono text-[10px] uppercase font-bold">Email:</span>
                        <a href={`mailto:${office.email}`} className="text-white hover:text-[#FF3D4F] hover:underline transition-all">
                          {office.email}
                        </a>
                      </div>
                      <button
                        onClick={() => handleCopyText(`${office.id}-email`, office.email)}
                        className="text-zinc-600 hover:text-white transition-colors cursor-pointer"
                        title="Copy Email"
                      >
                        {copiedStates[`${office.id}-email`] ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    {/* Office Hours */}
                    <div className="flex items-center gap-2 p-2.5 bg-zinc-950/40 border border-zinc-900/50 rounded-lg text-zinc-400 font-mono text-[10px]">
                      <Clock className="w-3.5 h-3.5 text-[#FF3D4F]" />
                      <span className="text-zinc-500 uppercase font-bold">Hours:</span>
                      <span>{office.hours}</span>
                    </div>

                  </div>
                </div>

                {/* 3. Fast Actions Panel (Maps & WhatsApp triggers) */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] text-zinc-500 uppercase font-mono tracking-widest font-bold block">GEOLOCATION ACTIONS</span>
                  
                  {/* Primary Map Button */}
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 border border-zinc-800 hover:border-zinc-700 bg-zinc-950 hover:bg-zinc-900 text-white rounded-xl transition-all text-xs font-black font-mono tracking-wider text-center"
                    id={`map-link-${office.id}`}
                  >
                    <ExternalLink className="w-4 h-4 text-[#FF3D4F]" />
                    <span>{office.mapButtonLabel.toUpperCase()}</span>
                  </a>

                  {/* Micro Geolocation Actions */}
                  <div className="grid grid-cols-3 gap-2">
                    <a
                      href={office.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-1 py-2 border border-zinc-900/60 hover:border-[#FF3D4F]/30 bg-zinc-950/40 hover:bg-[#FF3D4F]/5 text-zinc-400 hover:text-white rounded-lg transition-all text-[9px] font-bold font-mono tracking-wider text-center"
                      title="Get Directions"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#FF3D4F]" />
                      <span>DIRECTIONS</span>
                    </a>

                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: office.title,
                            text: `${office.label} - ${joinedAddress}`,
                            url: office.mapUrl,
                          }).catch(() => {});
                        } else {
                          handleCopyText(`${office.id}-share`, office.mapUrl);
                        }
                      }}
                      className="flex flex-col items-center justify-center gap-1 py-2 border border-zinc-900/60 hover:border-sky-500/30 bg-zinc-950/40 hover:bg-sky-500/5 text-zinc-400 hover:text-white rounded-lg transition-all text-[9px] font-bold font-mono tracking-wider text-center cursor-pointer"
                      title="Share Location Link"
                    >
                      {copiedStates[`${office.id}-share`] ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                          <span className="text-emerald-400 font-extrabold">COPIED!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-sky-400" />
                          <span>SHARE</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleCopyText(`${office.id}-address-action`, joinedAddress)}
                      className="flex flex-col items-center justify-center gap-1 py-2 border border-zinc-900/60 hover:border-emerald-500/30 bg-zinc-950/40 hover:bg-emerald-500/5 text-zinc-400 hover:text-white rounded-lg transition-all text-[9px] font-bold font-mono tracking-wider text-center cursor-pointer"
                      title="Copy Address Coordinates"
                    >
                      {copiedStates[`${office.id}-address-action`] ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                          <span className="text-emerald-400 font-extrabold">COPIED!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-emerald-400" />
                          <span>COPY ADD.</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Primary WhatsApp Action */}
                  <a
                    href={`https://wa.me/${office.whatsappNumbers[0]}?text=Hello%20Eurosia%20Team,%20I%20am%20interested%20in%20solutions.%20Please%20contact%20me.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 border border-emerald-500/20 hover:border-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/15 text-emerald-400 hover:text-white rounded-xl transition-all text-xs font-black font-mono tracking-wider text-center"
                    id={`whatsapp-link-${office.id}`}
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>CHAT WHATSAPP</span>
                  </a>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
