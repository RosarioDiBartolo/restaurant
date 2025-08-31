import { StaticImageData } from "next/image"

import GranitaThumbnail from "@/assets/granita.jpg"
import GelatoThumbnail from "@/assets/gelato.jpg"
import TavolaCaldaThumbnail from "@/assets/tavola-calda.jpg"
import PrimiThumbnail from "@/assets/primi-piatti.jpg"
import DrinksThumbnail from "@/assets/drinks.jpg"
import RedbullThumbnail from "@/assets/redbull.webp"
import PizzaThumbnail from "@/assets/pizza.jpg"
import PaniniThumbnail from "@/assets/panini.jpg"
import InsalateThumbnail from "@/assets/insalate.jpg"
import CaffeThumbnail from "@/assets/caffè.jpg"
import BirraThumbnail from "@/assets/birra.jpg"

export interface OptionValue {
  name: string
  additivePrice?: number
}

export interface Product {
  name: string
  thumbnail?: StaticImageData
  description: string
  price: number
  options?: Record<string, OptionValue[]>
}

export interface Category {
  name: string
  thumbnail: StaticImageData
  description: string
}

// Gusti per gelati e granite
const gustiGelatiGranite: OptionValue[] = [
  { name: "Pistacchio", additivePrice: 1.2 },
  { name: "Cioccolato" },
  { name: "Fragola" },
  { name: "Limone" },
  { name: "Mango" },
  { name: "Cocco" },
]

// Panna come opzione uniforme
const opzioniPanna: OptionValue[] = [
  { name: "No" },
  { name: "Si" },
  { name: "Sotto e sopra" },
]

// Formati di porzione
const opzioniTaglia: OptionValue[] = [
  { name: "Piccolo" },
  { name: "Medio", additivePrice: 0.5 },
  { name: "Grande", additivePrice: 1 },
]

// Bevande in lattina
const opzioniBevande: OptionValue[] = [
  { name: "Coca Cola" },
  { name: "Fanta" },
  { name: "Sprite" },
  { name: "Acqua Naturale" },
  { name: "Acqua Frizzante" },
]

// Extra per panini e pizze
const opzioniExtra: OptionValue[] = [
  { name: "Formaggio", additivePrice: 0.5 },
  { name: "Prosciutto", additivePrice: 0.8 },
  { name: "Funghi", additivePrice: 0.6 },
  { name: "Verdure grigliate", additivePrice: 0.7 },
]

export const categories: Category[] = [
  { name: "Primi",    thumbnail: PrimiThumbnail, description: "Piatti principali caldi e sostanziosi." },
  { name: "Dessert",  thumbnail: GelatoThumbnail, description: "Gelati, Granite e sorbetti artigianali." },
  { name: "Tavola calda", thumbnail: TavolaCaldaThumbnail, description: "Piatti pronti e specialità del giorno." },
  { name: "Pizze", thumbnail: PizzaThumbnail, description: "Pizze tradizionali cotte al forno." },
  { name: "Panini", thumbnail: PaniniThumbnail, description: "Panini freschi e gustosi." },
  { name: "Insalate", thumbnail: InsalateThumbnail, description: "Insalate fresche e leggere." },
  { name: "Bevande", thumbnail: DrinksThumbnail, description: "Bibite fresche e dissetanti." },
  { name: "Caffetteria", thumbnail: CaffeThumbnail, description: "Caffè, cappuccini e bevande calde." },
  { name: "Alcolici", thumbnail: BirraThumbnail, description: "Birre e vini selezionati." },
]

export const products: Record<string, Product[]> = {
  primi: [
    { name: "Pasta alla norma", description: "Tradizionale piatto siciliano con melanzane e ricotta salata.", price: 3.5 },
    { name: "Lasagna", description: "Lasagna al forno con ragù e besciamella.", price: 3.5 },
    { name: "Spaghetti alle vongole", description: "Spaghetti con vongole fresche e prezzemolo.", price: 5 },
    { name: "Risotto ai funghi", description: "Riso cremoso con funghi porcini.", price: 4.5 },
  ],

  dessert: [
    {
      name: "Granita",
      thumbnail: GranitaThumbnail,
      description: "Rinfrescante ghiacciolo siciliano.",
      price: 3.5,
      options: {
        "Primo Gusto": gustiGelatiGranite,
        "Secondo Gusto": gustiGelatiGranite,
        "Panna": opzioniPanna,
        "Taglia": opzioniTaglia,
      },
    },
    {
      name: "Gelato",
      thumbnail: GelatoThumbnail,
      description: "Gelato artigianale.",
      price: 3.5,
      options: {
        "Primo Gusto": gustiGelatiGranite,
        "Secondo Gusto": gustiGelatiGranite,
        "Panna": opzioniPanna,
      },
    },
    {
      name: "Tiramisù",
      description: "Classico dolce italiano con mascarpone e caffè.",
      price: 4,
    },
    {
      name: "Cannolo Siciliano",
      description: "Cialda croccante ripiena di ricotta dolce.",
      price: 3.5,
    },
  ],

  "tavola calda": [
    { name: "Arancino", description: "Riso ripieno, a scelta tra ragù o burro.", price: 3.5 },
    { name: "Cartocciata", description: "Pizza al forno ripiena di prosciutto e mozzarella.", price: 3.5 },
    { name: "Brioche salata", description: "Soffice brioche farcita con salumi e formaggi.", price: 3 },
  ],

  pizze: [
    { name: "Margherita", thumbnail: PizzaThumbnail, description: "Pomodoro, mozzarella e basilico.", price: 5 },
    { name: "Diavola", thumbnail: PizzaThumbnail, description: "Pomodoro, mozzarella e salame piccante.", price: 6 },
    { name: "Capricciosa", thumbnail: PizzaThumbnail, description: "Pomodoro, mozzarella, prosciutto, funghi, carciofi e olive.", price: 7 },
  ],

  panini: [
    {
      name: "Panino Prosciutto e Formaggio",
      thumbnail: PaniniThumbnail,
      description: "Pane fresco con prosciutto cotto e formaggio.",
      price: 4,
      options: { "Extra": opzioniExtra },
    },
    {
      name: "Panino Vegetariano",
      thumbnail: PaniniThumbnail,
      description: "Pane integrale con verdure grigliate.",
      price: 4.5,
    },
  ],

  insalate: [
    { name: "Insalata Mista", thumbnail: InsalateThumbnail, description: "Pomodori, lattuga, cetrioli e carote.", price: 4 },
    { name: "Insalata Greca", thumbnail: InsalateThumbnail, description: "Con feta, olive e cipolla rossa.", price: 5 },
    { name: "Insalata di Pollo", thumbnail: InsalateThumbnail, description: "Con pollo grigliato e verdure.", price: 5.5 },
  ],

  bevande: [
    { name: "Acqua", description: "Bottiglia da 50cl, naturale o frizzante.", price: 1 },
    { name: "Bibite in lattina", description: "Seleziona la tua bibita preferita.", price: 2, options: { "Gusto": opzioniBevande } },
    { name: "Redbull", thumbnail: RedbullThumbnail, description: "Lattina di Redbull.", price: 2.5 },
    { name: "Succo di frutta", description: "Pesca, pera o arancia.", price: 2 },
  ],

  caffetteria: [
    { name: "Espresso", thumbnail: CaffeThumbnail, description: "Caffè espresso corto.", price: 1 },
    { name: "Cappuccino", thumbnail: CaffeThumbnail, description: "Caffè espresso con latte montato.", price: 1.5 },
    { name: "Latte macchiato", thumbnail: CaffeThumbnail, description: "Latte caldo con un tocco di caffè.", price: 1.8 },
  ],

  alcolici: [
    { name: "Birra alla spina", thumbnail: BirraThumbnail, description: "Piccola, media o grande.", price: 3, options: { "Taglia": opzioniTaglia } },
    { name: "Calice di vino", thumbnail: BirraThumbnail, description: "Vino rosso o bianco della casa.", price: 3.5 },
  ],
}
