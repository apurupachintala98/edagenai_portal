import { Button, ClickableTile } from "@carbon/react";
import { useNavigate } from "react-router-dom";

import { useDropdown } from "../hooks/useDropdown";
import {
  ChevronDown,
  ChevronUp,
} from "@carbon/react/icons";

interface DropdownItem {
  label: string;
  url: string;
}

interface DropdownButtonProps {
  icon: React.ReactNode;
  label: string;
  items: DropdownItem[];
}

export const DropdownButton = ({ icon, label, items }: DropdownButtonProps) => {
    const { open, setOpen, ref } = useDropdown();
    const navigate = useNavigate();

    const handleItemClick = (url: string) => {
      if (url.startsWith("/")) {
        navigate(url);  
      } else {
        window.open(url, "_blank"); 
      }
      setOpen(false); 
    };
    return (
      <div style={{ position: "relative" }} ref={ref}>
        <Button style={{borderRadius: "6px"}} kind="primary" size="lg" renderIcon={open ? ChevronUp : ChevronDown} onClick={() => setOpen(!open)}>
          <span style={{paddingRight: "5px"}}>{icon}</span>
          {label}
        </Button>
  
        {open && (
          <ul
            style={{
              position: "absolute",
              top: "100%",
              background: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "4px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              zIndex: 10,
              minWidth: "160px",
              listStyle: "none",
              padding: 0,
              margin: "4px 0 0 0"
            }}
          >
            {items.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleItemClick(item.url)}
                style={{
                  padding: "6px 10px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textAlign: "left",
                  borderBottom: idx !== items.length - 1 ? "1px solid #e0e0e0" : "none",
                  userSelect: "none"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#f4f4f4"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  
