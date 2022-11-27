using API.DTOs;
using API.Entities;
using AutoMapper;

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