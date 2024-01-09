type CategorieData = {
  id: string | number;
  nom: string;
};

type MarqueData = {
  id: string | number;
  nom: string;
};

type MoteurTypeData = {
  id: string | number;
  type: string;
};

type PaysData = {
  id: string | number;
  nom: string;
};

type VenteData = {
  id: string | number;
  idAnnonce: string | number;
  prix: number;
  dateVente: string;
};

type ImageData = {
  nomImage: string;
  base64: any;
};

type UtilisateurData = {
  id: string | number;
  nom: string;
  prenoms: string;
  dateNaissance: string;
  genre: string;
  nationalite: PaysData;
};

type AnnonceData = {
  id: string | number;
  proprietaire: UtilisateurData;
  categorie: CategorieData;
  marque: MarqueData;
  modele: string;
  moteurType: MoteurTypeData;
  consommation: number;
  nombrePlace: number;
  nombrePorte: number;
  annee: number;
  kilometrage: number | null | undefined;
  provenance?: PaysData | null | undefined;
  prix: number;
  statut: number;
  dataAnnonce: string;
  images: ImageData[] | null | undefined;
};

export type {
  CategorieData,
  MarqueData,
  MoteurTypeData,
  PaysData,
  VenteData,
  ImageData,
  UtilisateurData,
  AnnonceData,
};
