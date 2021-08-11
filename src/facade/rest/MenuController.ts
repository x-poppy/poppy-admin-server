import { MenuTreeBo } from '@/domain/bo/MenuTreeBo';
import { PermissionsBo } from '@/domain/bo/PermissionsBo';
import { MenuService } from '@/domain/service/MenuService';
import { Inject, Provider } from '@augejs/core';
import { KoaContext, Prefix, RequestMapping, RequestParams } from '@augejs/koa';
import { KoaAccessTokenMiddleware } from '@augejs/koa-access-token';

@Prefix('/api/v1/menu')
@Provider()
export class MenuController {
  @Inject(MenuService)
  private menuService!: MenuService;

  @KoaAccessTokenMiddleware()
  @RequestMapping.Get('')
  async list(@RequestParams.Context() context: KoaContext): Promise<MenuTreeBo | null> {
    const appNo = (context.accessData?.get('appNo') as string) ?? null;
    const permissions = context.accessData?.get<Record<string, boolean>>('userPermissions') ?? {};
    const permissionsBo = new PermissionsBo(permissions);
    const menuTree = await this.menuService.findMenuTreeByAppNo(appNo, permissionsBo);
    return menuTree;
  }
}
