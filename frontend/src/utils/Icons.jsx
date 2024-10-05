import { Icon } from "leaflet";

const userIcon = new Icon({
  iconUrl:
    "https://img.icons8.com/?size=100&id=3nOZtpH7KQrP&format=png&color=000000",
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [-3, -76],
});

const fireIcon = new Icon({
  iconUrl: "https://img.icons8.com/?size=100&id=80847&format=png&color=000000",
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [-3, -76],
});

const severeStormsIcon = new Icon({
  iconUrl:
    "https://img.icons8.com/?size=100&id=KRnLq8idCI97&format=png&color=000000",
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [-3, -76],
});

const alertIcon = new Icon({
  iconUrl: "https://img.icons8.com/?size=100&id=12051&format=png&color=000000",
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [-3, -76],
});

export { userIcon, fireIcon, severeStormsIcon, alertIcon };
