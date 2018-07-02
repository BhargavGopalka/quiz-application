import { AdminAppRoutingModule } from './admin-app-routing.module';

describe('AdminAppRoutingModule', () => {
  let adminAppRoutingModule: AdminAppRoutingModule;

  beforeEach(() => {
    adminAppRoutingModule = new AdminAppRoutingModule();
  });

  it('should create an instance', () => {
    expect(adminAppRoutingModule).toBeTruthy();
  });
});
