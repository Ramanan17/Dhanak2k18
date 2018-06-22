using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dhanak.Controllers.Resources;
using Dhanak.Models;
using Dhanak.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Dhanak.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DhanakDbContext context;

        public UserController(DhanakDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await context.Users.ToListAsync();
            return Ok(users);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await context.Users.SingleOrDefaultAsync(m => m.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);

        }

        [HttpGet("name/{name}")]
        public async Task<IActionResult> Get(string name)
        {
            var user = await context.Users.SingleOrDefaultAsync(m => m.Name== name);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);

        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] UserResource userResource)
        {
            if (context.Users.Any(m => m.Name == userResource.Name))
            {
                return Ok(userResource);
            }
            var user =new User()
            {
                Name=userResource.Name,
                Phone = userResource.Phone
            };

            await context.AddAsync(user);
            await context.SaveChangesAsync();
            return Ok(user);

        }

        [HttpPut("{id}")]

        public async Task<IActionResult> Put(int id, [FromBody] UserResource usernew)
        {
            var user = await context.Users.SingleOrDefaultAsync(m => m.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            user.Name = usernew.Name;
            user.Phone = usernew.Phone;
            await context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await context.Users.SingleOrDefaultAsync(m => m.Id == id);
            if (user == null)
            {
                return NotFound();
            }

             context.Remove(user);
            await context.SaveChangesAsync();
            return Ok();


        }
    }
}