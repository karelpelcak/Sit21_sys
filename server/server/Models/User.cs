using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Text;

namespace server.Models;

public class User
{
    [Key]
    public int Id { get; set; }
    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }

    public User(){}
    
    public User(LoginModel loginModel)
    {
        Username = loginModel.Username;
        Password = loginModel.Password;
    }
    public User(RegisterModel registerModel)
    {
        Firstname = registerModel.Firstname;
        Lastname = registerModel.Lastname;
        Email = registerModel.Email;
        Password = registerModel.Password;
        Username = GenerateUsername(Firstname, Lastname);
    }
    private string GenerateUsername(string firstname, string lastname)
    {
        firstname = RemoveDiacritics(firstname).ToLower();
        lastname = RemoveDiacritics(lastname).ToLower();
        return $"{firstname}{lastname}";
    }
    private string RemoveDiacritics(string text)
    {
        var normalizedString = text.Normalize(NormalizationForm.FormD);
        var stringBuilder = new StringBuilder();

        foreach (var c in normalizedString)
        {
            var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
            if (unicodeCategory != UnicodeCategory.NonSpacingMark)
            {
                stringBuilder.Append(c);
            }
        }

        return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
    }
}

public class LoginModel
{
    [Required]
    public string Username { get; set; }
    [Required]
    public string Password { get; set; }
}

public class RegisterModel
{
    [Required]
    public string Firstname { get; set; }
    [Required]
    public string Lastname { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
}