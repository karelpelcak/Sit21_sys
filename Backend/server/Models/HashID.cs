using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class HashID
{
    [Key]
    public int HashingID { get; set; }
    public string HashedID { get; set; }
    public int UserID { get; set; }
}