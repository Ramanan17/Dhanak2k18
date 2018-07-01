using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;
using Dhanak.Models;
using Dhanak.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.EntityFrameworkCore;

namespace Dhanak.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly DhanakDbContext context;

        public RegistrationController(DhanakDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetRegistration()
        {
            var registration = await context.Registration.ToListAsync();
            return Ok(registration);

        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetUsers(int id)
        {
            var user = context.Registration.Where(m => m.EventID == id);
            var users = new List<User>();
            foreach (var u in user)
            {
                var registered = await context.Users.SingleOrDefaultAsync(m => m.Id == u.UserId);
                if (registered != null)
                {
                    users.Add(registered);
                }
                
            }

            return Ok(users);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEvents(int id)
        {
            var eventreg = context.Registration.Where(m => m.UserId == id);
            var events = new List<Events>();
            foreach (var e in eventreg)
            {
                var selected = await context.Events.Include(m => m.Category)
                    .SingleOrDefaultAsync(m => m.Id == e.EventID);
                events.Add(selected);

            }

            return Ok(events);

        }

        [HttpPost("{userid}/{eventid}")]
        public async Task<IActionResult> AddRegistration(int userid, int eventid)
        {

            var registration = new EventRegistration()
            {
                EventID = eventid,
                UserId = userid

            };
            await context.AddAsync(registration);
            await context.SaveChangesAsync();
            return Ok(registration);

        }

        [HttpDelete("{userid}/{eventid}")]
        public async Task<IActionResult> DeleteRegistration(int userid, int eventid)
        {
            var result=new EventRegistration()
            {
                Id = 0
            };

            var eventreg = context.Registration.Where(m => m.UserId == userid);
            if (eventreg == null)
            {
                return BadRequest();
            }

            foreach (var e in eventreg)
            {
                if (e.EventID == eventid)
                {
                     result = e;

                    break;
                }
            }

            if (result.Id == 0)
            {
                return BadRequest();
            }
           

            context.Remove(result);
            await context.SaveChangesAsync();
            return Ok(result);


        }
    }
}