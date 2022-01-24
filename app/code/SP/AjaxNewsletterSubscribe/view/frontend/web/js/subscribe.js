/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

/*jshint browser:true jquery:true*/
/*global alert*/
define([
    "jquery",
    'ko',
    'uiComponent',
    'Magento_Ui/js/modal/alert',
    "jquery/ui",
    "mage/translate",
    "mage/mage",
    "mage/validation"
], function ($, ko, Component, alert, mage) {
    "use strict";
    
    return Component.extend({
        defaults: {
            msgSaved: false,
            template: 'SP_AjaxNewsletterSubscribe/subscribe',
        },
        /** Initialize observable properties */
        initObservable: function () {
            this._super()
                    .observe('msgSaved');
                    this.email = ko.observable('');
            return this;
        },
        /**
         * Validate newsletter subscribe form
         */
        validateForm: function () {
            var form = '#newsletter-validate-detail';
            return $(form).validation() && $(form).validation('isValid');
        },
        submitNewsletter: function () {
            if (!this.validateForm()) {
             return;
            }
            var data = {'email':this.email()};
            $.ajax({
                url: this.getNewsletterUrl,
                data: data,
                type: 'post',
                dataType: 'json',
                context: this,
                beforeSend: this._ajaxBeforeSend,
                success: function (response) {
                    if (response.error) {
                        this.msgSaved(true);
                        $('.loading-message').html('<div class="message message-error error">'+response.message+'</div>');
                    } else {
                        this.msgSaved(true);
                        $('#newsletter').val('');
                        $('.loading-message').html('<div class="message message-success success">'+response.message+'</div>');
                    }
                },
                error: function() {
                    $('.loading-message').html('<div class="message message-error error">'+response.message+'</div>');
                },
                complete: this._ajaxComplete
            });
        }
    });
}
);
