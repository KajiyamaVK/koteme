using koteme_api.enums;

namespace koteme_api.interfaces
{
    public interface IAddress
    {
        string Name { get; set; }
        string City { get; set; }
        string State { get; set; }
        string ZipCode { get; set; }
        string Complement { get; set; }
        string Neighborhood { get; set; }
        TypeAddress Type { get; set; }
        int IdUser { get; set; }
    }
}
