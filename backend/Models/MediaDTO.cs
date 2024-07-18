namespace backend.Models;

public class MediaDTO
{
    public string? Id {get; set;}
    public string? Description {get; set;}
    public string? MediaUrl {get; set;}
    public string? MimeType {get; set;}
    public string? Filename {get; set;}

    public MediaDTO() {}
    public MediaDTO(CasCap.Models.MediaItem media)
    {
        Id = media.id;
        Description = media.description;
        // TODO: Add error checking.
        // if (!Uri.IsWellFormedUriString(media.baseUrl, UriKind.Absolute))
        //     throw new UriFormatException(
        //         $"Poorly formed Media URL ({media.baseUrl}).");
        // https://developers.google.com/photos/library/guides/access-media-items#base-urls
        // TODO: query params support for width & height?
        MediaUrl = $"{media.baseUrl}=w2048-h1024";
        MimeType = media.mimeType;
        Filename = media.filename;
    }
}