using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.Computers
{
    public class Details
    {
        public class Query : IRequest<Result<Computer>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<Computer>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Computer>> Handle(Query request, CancellationToken cancellationToken)
            {
                var computer= await _context.Computers.FindAsync(request.Id);
                return Result<Computer>.Success(computer);
            }
        }
    }
}