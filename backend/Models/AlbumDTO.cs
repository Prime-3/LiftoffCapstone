namespace backend.Models;
public class AlbumDTO
{
    public string? Id {get; set;}
    public string? Title {get; set;}
    public string? CoverPhotoUrl {get; set;}
    public int? Count {get; set;}

    public AlbumDTO() {}
    public AlbumDTO(CasCap.Models.Album album)
    {
        Id = album.id;
        Title = album.title;
        // https://developers.google.com/photos/library/guides/access-media-items#base-urls
        CoverPhotoUrl = Uri.IsWellFormedUriString(album.coverPhotoBaseUrl, UriKind.Absolute)
            ? $"{album.coverPhotoBaseUrl}=w2048-h1024"
            : "";
        Count = album.mediaItemsCount;
    }
}