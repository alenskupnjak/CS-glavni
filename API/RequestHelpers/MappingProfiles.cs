using AutoMapper;
using BasketPrj.DTOs;
using BasketPrj.Entities;

namespace API.RequestHelpers
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