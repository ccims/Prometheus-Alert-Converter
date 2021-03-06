import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as data from './sample-alert.json';

/**
 * Controller to handle incoming Alerts.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  /**
   * Example Request to Test whether the Sample-Alerts.json File can be converted into LogMessages.   
   * 
   * @returns a resolved Promise containing the converted LogMessages.
   */
  @Get('/get-sample')
  async convertSampleAlerts(): Promise<any> {
    return this.appService.convertAlertToLogMessages(data);
  }

  /**
   * Example Request for sending converted sample Alerts from Sample-Alerts.json to the Queue.
   * 
   * @returns a resolved Promise if the Alerts from sample-alert.json are converted correctly and send to the Queue.
   */
  @Get('/send-sample')
  async respondToRequest(): Promise<any> {
    return this.appService.convertAndSendAlert(data);
  }

  /**
   * Endpoint for the Alert-Manager, incoming Alerts will be converted and sent to the Kafka Queue.
   * For more details of the Queue see: https://ccims.github.io/overview-and-documentation/error-response-monitor.
   * 
   * @param alerts the Alerts to convert.
   * @returns A resolved Promise with text: "Conversion complete, send LogMessages to Queue". 
   */
  @Post('post-alerts')
  addAlertsToConvert(@Body() alerts): Promise<any>  {
    return this.appService.convertAndSendAlert(alerts);
  }

}
