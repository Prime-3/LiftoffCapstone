namespace backend.Models;

public class PhotoDTO
{
    public string? Id {get; set;}
    public string? Description {get; set;}
    public string? PhotoUrl {get; set;}
    public string? MimeType {get; set;}
    public string? Filename {get; set;}

    public PhotoDTO() {}
    public PhotoDTO(CasCap.Models.MediaItem media)
    {
        Id = media.id;
        Description = media.description;
        if (!Uri.IsWellFormedUriString(media.baseUrl, UriKind.Absolute))
            throw new UriFormatException(
                $"Poorly formed Photo URL ({media.baseUrl}).");
        PhotoUrl = $"{media.baseUrl}=w2048-h1024";
        MimeType = media.mimeType;
        Filename = media.filename;
    }
}