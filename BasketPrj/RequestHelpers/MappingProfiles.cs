using AutoMapper;
using BasketPrj.DTOs;
using BasketPrj.Entities;

namespace BasketPrj.RequestHelpers
{
  public class MappingProfiles : Profile
  {
    public MappingProfiles()
    {
      //  Od ---> do
      CreateMap<CreateProductDto, Product>();
      CreateMap<UpdateProductDto, Product>();
    }
  }
}