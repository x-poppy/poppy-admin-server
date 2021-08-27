import { AppDomainService } from '@/domain/service/AppDomainService';
import { Inject, Provider } from '@augejs/core';
import { KoaContext, Prefix, RequestMapping, RequestParams } from '@augejs/koa';
import { AccessData, KoaAccessTokenMiddleware } from '@augejs/koa-access-token';

@Prefix('/api/v1/resource/resource')
@Provider()
export class ResourceController {
  @Inject(AppDomainService)
  appDomainService!: AppDomainService;

  @KoaAccessTokenMiddleware()
  @RequestMapping.Get('')
  async list(
    @RequestParams.Context() ctx: KoaContext,
    @RequestParams.Query('offset') @RequestParams((value: string) => parseInt(value)) offset: number,
    @RequestParams.Query('size') @RequestParams((value: string) => parseInt(value)) size: number,
  ): Promise<Record<string, unknown>> {
    const accessData = ctx.accessData as AccessData;
    // const userOrgNo = accessData.get<string>('userOrgNo');
    // const appNo = accessData.get<string>('appNo');
    // const userRoleLevel = accessData.get<number>('userRoleLevel');
    // const [list, count] = await this.roleService.list({
    //   offset,
    //   size,
    //   appNo,
    //   orgNo: userOrgNo,
    //   roleLevel: userRoleLevel,
    // });
    return {
      list: [],
      count: 0,
    };
  }

  @KoaAccessTokenMiddleware()
  @RequestMapping.Delete(':domain')
  async delete(@RequestParams.Params('domain') domain: string): Promise<Record<string, unknown>> {
    return {};
  }

  @KoaAccessTokenMiddleware()
  @RequestMapping.Post('')
  async create(): Promise<Record<string, unknown>> {
    return {};
  }

  @KoaAccessTokenMiddleware()
  @RequestMapping.Put('')
  async update(): Promise<Record<string, unknown>> {
    return {};
  }
}
