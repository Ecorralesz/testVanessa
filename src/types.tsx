export interface Artist {
    idArtist: string;
    name: string;
    bio: string;
    strArtist: string;
    strArtistBanner: string;
    strArtistLogo: string;
    strGenre: string;
    strCountry: string;
    strBiographyEN: string;
}

export interface Album {
    idAlbum: string;
    title: string;
    releaseYear: number;
    strAlbum:string;
    strAlbumThumb: string;
    intYearReleased: string;
    strDescriptionEN: string;
    strArtist: string;
}
