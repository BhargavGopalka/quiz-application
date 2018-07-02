import { AdminAuthRoutingModule } from './admin-auth-routing.module';

describe('AdminAuthRoutingModule', () => {
  let adminAuthRoutingModule: AdminAuthRoutingModule;

  beforeEach(() => {
    adminAuthRoutingModule = new AdminAuthRoutingModule();
  });

  it('should create an instance', () => {
    expect(adminAuthRoutingModule).toBeTruthy();
  });
});
