import Vue from 'vue';

export default class Prompt {

  public static message(info: any, successText: string, warningText: string) {
    let message = '';
    if (info) {
      if (info.success) {
        message = Prompt.getDefaultPromptText(info);
        if (!message || '' === message) {
          message = successText;
        }
        Vue.prototype.$notify.success({
          title: '成功',
          message: message,
        });
      } else {
        message = Prompt.getDefaultErrorText(info);
        if (!message || '' === message) {
          message = warningText;
        }
        Vue.prototype.$notify.warning({
          title: '警告',
          message: message,
        });
      }
    } else {
      Vue.prototype.$notify.error({
        title: '错误',
        message: warningText,
      });
    }
  }

  public static notice(message: string, title?: string, type?: string) {
    type = type ? type : 'info';

    if ('info' === type) {
      Vue.prototype.$notify.info({
        title: title || '信息',
        message: message,
      });
    }
    if ('success' === type) {
      Vue.prototype.$notify.success({
        title: title || '成功',
        message: message,
      });
    }
    if ('warn' === type) {

      Vue.prototype.$notify.warning({
        title: title || '警告',
        message: message,
      });
    }
    if ('error' === type) {
      Vue.prototype.$notify.error({
        title: title || '错误',
        message: message,
      });
    }
  }

  public static getDefaultErrorText(info: any) {
    let text = '';
    if (info) {
      const warnings = info.warnings;
      const errors = info.errors;
      if (warnings && warnings.length > 0) {
        for (const warning of warnings) {
          text = text + warning.text + '\n';
        }
      } else if (errors && errors.length > 0) {
        for (const error of errors) {
          text = text + error.text + '\n';
        }
      }
    }
    return text;
  }

  public static getDefaultPromptText(info: any) {
    let text = '';
    if (info) {
      const prompts = info.prompts;
      if (prompts && prompts.length > 0) {
        for (const prompt of prompts) {
          text = text + prompt.text + '\n';
        }
      }
    }
    return text;
  }
}
