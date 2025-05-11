
import React from 'react';
import { VisitorData } from '@/utils/ipLocator';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";

interface VisitorMapProps {
  visitors: VisitorData[];
  width?: string;
  height?: string;
}

const VisitorMap: React.FC<VisitorMapProps> = ({ 
  visitors, 
  width = '100%', 
  height = '400px' 
}) => {
  // This is a simplified map visualization
  // In a real application, you would use a library like Mapbox, Google Maps, or Leaflet
  
  // World map dimensions (simplified)
  const mapWidth = 360; // -180 to 180 longitude
  const mapHeight = 180; // -90 to 90 latitude
  
  const getPositionStyle = (visitor: VisitorData) => {
    // Convert latitude and longitude to position on the map
    const x = ((visitor.longitude + 180) / mapWidth) * 100;
    const y = ((90 - visitor.latitude) / mapHeight) * 100;
    
    return {
      left: `${x}%`,
      top: `${y}%`,
      backgroundColor: visitor.isBlocked ? 'rgba(255, 85, 85, 0.8)' : 'rgba(100, 255, 218, 0.8)',
    };
  };

  return (
    <div 
      className="relative border border-cyber-light rounded-md overflow-hidden bg-cyber-dark"
      style={{ width, height }}
    >
      <div className="absolute inset-0 bg-cyber-light/5 z-0">
        {/* Simple world map grid */}
        {Array.from({ length: 18 }).map((_, i) => (
          <div 
            key={`v-${i}`}
            className="absolute border-r border-cyber-light/20"
            style={{ 
              left: `${(i + 1) * 5}%`, 
              top: 0, 
              height: '100%',
              width: '1px'
            }}
          />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <div 
            key={`h-${i}`}
            className="absolute border-b border-cyber-light/20"
            style={{ 
              top: `${(i + 1) * 10}%`, 
              left: 0, 
              width: '100%',
              height: '1px'
            }}
          />
        ))}
      </div>
      
      <TooltipProvider>
        {visitors.map((visitor, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <div
                className="absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse-glow cursor-help transition-all duration-300 hover:scale-150"
                style={getPositionStyle(visitor)}
              />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <div className="text-xs space-y-1">
                <div><strong>Location:</strong> {visitor.city}, {visitor.country}</div>
                <div><strong>IP:</strong> {visitor.ip}</div>
                <div><strong>Device:</strong> {visitor.model || visitor.deviceType || "Unknown"}</div>
                <div><strong>OS:</strong> {visitor.operatingSystem || "Unknown"}</div>
                <div><strong>Browser:</strong> {visitor.browser}{visitor.browserVersion ? ` v${visitor.browserVersion}` : ""}</div>
                <div><strong>Status:</strong> {visitor.isBlocked ? "Blocked" : "Allowed"}</div>
              </div>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
      
      <div className="absolute bottom-2 right-2 text-xs text-cyber-text">
        Visitors: {visitors.length} | Blocked: {visitors.filter(v => v.isBlocked).length}
      </div>
    </div>
  );
};

export default VisitorMap;
