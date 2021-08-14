import { Module, boot, GetLogger, ILogger, Inject } from '@augejs/core';
import { KoaContext, MiddlewareHandler, WebServer } from '@augejs/koa';
import { KoaStatic, KoaFavicon, KoaSend } from '@augejs/koa-static';
import { I18nConfig } from '@augejs/i18n';
import { AxiosConfig } from '@augejs/axios';
import { YAMLConfig } from '@augejs/file-config';
import { RedisConnection } from '@augejs/redis';
import { Log4js } from '@augejs/log4js';
import { MailTransport } from '@augejs/mail';
import { Typeorm } from '@augejs/typeorm';
import { KoaAccessTokenManager } from '@augejs/koa-access-token';
import { KoaSessionTokenManager } from '@augejs/koa-session-token';
import { Views } from '@augejs/views';
import { KoaBodyParserMiddleware } from '@augejs/koa-bodyparser';
import { KoaSwagger } from '@augejs/koa-swagger';

import { Providers as ApplicationLayerProviders } from './application';
import { Providers as DomainLayerProviders } from './domain';
import { Providers as FacadeLayerProviders } from './facade';
import { Providers as InfrastructureLayerProviders } from './infrastructure';

import { RestfulAPIHandlerService } from './application/service/RestfulAPIHandlerService';

@I18nConfig()
@Typeorm()
@MailTransport()
@Log4js()
@YAMLConfig()
@KoaFavicon()
@AxiosConfig()
@KoaStatic()
@WebServer()
@Views()
// @KoaSwagger()
@RedisConnection()
@KoaAccessTokenManager()
@KoaSessionTokenManager()
@KoaBodyParserMiddleware()
@KoaSend()
@Module({
  providers: [...FacadeLayerProviders, ...ApplicationLayerProviders, ...DomainLayerProviders, ...InfrastructureLayerProviders],
})
class AppModule {
  @GetLogger()
  logger!: ILogger;

  @Inject(RestfulAPIHandlerService)
  restfulAPIHandlerService!: RestfulAPIHandlerService;

  @MiddlewareHandler()
  async globalHandler(ctx: KoaContext, next: CallableFunction): Promise<void> {
    try {
      await next();
      this.restfulAPIHandlerService.handlerSuccess(ctx);
    } catch (err) {
      this.restfulAPIHandlerService.handlerError(ctx, err);
    }
  }

  async onAppDidReady(): Promise<void> {
    this.logger.info('server is running!');
  }
}

async function main() {
  await boot(AppModule);
}

main();
