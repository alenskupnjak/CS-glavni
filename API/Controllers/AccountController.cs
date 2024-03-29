﻿using System.Linq;
using System.Threading.Tasks;
using BasketPrj.DTOs;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BasketPrj.Entities;
using BasketPrj.Data;
using BasketPrj.Services;

namespace API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AccountController : ControllerBase
	{
		private readonly UserManager<User> _userManager;
		private readonly TokenService _tokenService;
		private readonly StoreContext _context;
		public AccountController(UserManager<User> userManager, TokenService tokenService , StoreContext context)
		{
			_context = context;
			_tokenService = tokenService;
			_userManager = userManager;
		}

		[HttpPost("login")]
		public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
		{
			var user = await _userManager.FindByNameAsync(loginDto.Username);

			if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
				return Unauthorized();

			var userBasket = await RetrieveBasket(loginDto.Username);
			var anonBasket = await RetrieveBasket(Request.Cookies["buyerId"]);

			if (anonBasket != null)
			{
				if (userBasket != null) _context.BasketsTBL.Remove(userBasket);
				anonBasket.BuyerId = user.UserName;
				Response.Cookies.Delete("buyerId");
				await _context.SaveChangesAsync();
			}

			return new UserDto
			{
				Email = user.Email,
				Token = await _tokenService.GenerateToken(user),
				Basket = anonBasket != null ? anonBasket.MapBasketToDto() : userBasket?.MapBasketToDto(),
				DisplayName = user.UserName.Substring(0, 2)
			};
		}

		// REGISTER REGISTER REGISTER
		[HttpPost("register")]
		public async Task<ActionResult> Register(RegisterDto registerDto)
		{
			var user = new User { UserName = registerDto.Username, Email = registerDto.Email };

			var result = await _userManager.CreateAsync(user, registerDto.Password);

			if (!result.Succeeded)
			{
				foreach (var error in result.Errors)
				{
					ModelState.AddModelError(error.Code, error.Description);
				}
				return ValidationProblem();
			}

			await _userManager.AddToRoleAsync(user, "Member");

			HttpContext.Response.Headers.Add("Link","Pokusni i radi!");

			return StatusCode(201);

		}

		[Authorize]
		[HttpGet("currentUser")]
		public async Task<ActionResult<UserDto>> GetCurrentUser()
		{
			var user = await _userManager.FindByNameAsync(User.Identity.Name);
			var userBasket = await RetrieveBasket(User.Identity.Name);

			return new UserDto
			{
				Email = user.Email,
				Token = await _tokenService.GenerateToken(user),
				Basket = userBasket?.MapBasketToDto()
			};
		}


		// GET adress
		[Authorize]
		[HttpGet("savedAddress")]
		public async Task<ActionResult<UserAddress>> GetSavedAddress()
		{
			return await _userManager.Users
					.Where(x => x.UserName == User.Identity.Name)
					.Select(user => user.Address)
					.FirstOrDefaultAsync();
		}

		private async Task<Basket> RetrieveBasket(string buyerId)
		{
			if (string.IsNullOrEmpty(buyerId))
			{
				Response.Cookies.Delete("buyerId");
				return null;
			}
			return await _context.BasketsTBL
					.Include(i => i.Items)
					.ThenInclude(p => p.Product)
					.FirstOrDefaultAsync(x => x.BuyerId == buyerId);
		}
	}
}