import React from "react";
import { Headset } from 'lucide-react';
import {CONTACT_CALL} from "@/data/constants.js";

export default function CallNowButton() {
    return (
        <a
            href={`tel:+971${CONTACT_CALL}`}  // <-- YOUR PHONE NUMBER
            className="call-now-btn"
        >
            <Headset size={24} />
            <span>Call Now</span>
        </a>
    );
}
