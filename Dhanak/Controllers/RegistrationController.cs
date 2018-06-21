using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dhanak.Models;
using Dhanak.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        [HttpPost("{eventid}/{userid}")]
        public async Task<IActionResult> AddRegistration(int eventid, int userid)
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
    }
}