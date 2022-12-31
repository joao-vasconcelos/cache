/* * * * * */
/* MODEL: TRANSACTION */
/* * */

/* * */
/* IMPORTS */
const mongoose = require('mongoose');

/* * */
/* Schema for MongoDB ["Transaction"] Object */
module.exports =
  mongoose.models.Transaction ||
  mongoose.model(
    'Transaction',
    new mongoose.Schema(
      {
        //
        // GENERAL
        // createdAt: {
        //   type: Date,
        // },

        // DEVICE
        // In which device was this transaction closed.
        device: {
          _id: {
            type: String,
            maxlength: 30,
          },
          title: {
            type: String,
            maxlength: 30,
          },
        },

        // LOCATION
        // Which location is this transaction associated with.
        location: {
          _id: {
            type: String,
            maxlength: 30,
          },
          title: {
            type: String,
            maxlength: 30,
          },
        },

        // USER
        // Which user closed this transaction.
        user: {
          _id: {
            type: String,
            maxlength: 30,
          },
          name: {
            type: String,
            maxlength: 30,
          },
          role: {
            type: String,
            maxlength: 30,
          },
        },

        // LAYOUT
        // What was the layout used at the moment.
        layout: {
          _id: {
            type: String,
            maxlength: 30,
          },
          title: {
            type: String,
            maxlength: 30,
          },
        },

        // ITEMS
        // The list of products transacted.
        items: [
          {
            product_id: {
              type: String,
              maxlength: 30,
            },
            product_image: {
              type: String,
              maxlength: 30,
            },
            product_title: {
              type: String,
              maxlength: 30,
            },
            variation_id: {
              type: String,
              maxlength: 30,
            },
            variation_title: {
              type: String,
              maxlength: 50,
            },
            qty: {
              type: Number,
            },
            price: {
              type: Number,
            },
            tax_id: {
              type: String,
              maxlength: 3, // NOR, INT, RED
            },
            tax_percentage: {
              type: Number,
            },
            line_base: {
              type: Number,
            },
            line_tax: {
              type: Number,
            },
            line_total: {
              type: Number,
            },
          },
        ],

        // DISCOUNTS
        // The discounts applied in this transaction.
        discounts: [
          {
            _id: {
              type: String,
              maxlength: 30,
            },
            title: {
              type: String,
              maxlength: 30,
            },
            subtitle: {
              type: String,
              maxlength: 50,
            },
            description: {
              type: String,
              maxlength: 250,
            },
            amount: {
              type: Number,
            },
          },
        ],

        // CUSTOMER (Optional)
        // The customer associated with this transaction.
        customer: {
          _id: {
            type: String,
            maxlength: 30,
          },
          first_name: {
            type: String,
            maxlength: 30,
          },
          last_name: {
            type: String,
            maxlength: 30,
          },
          reference: {
            type: String,
            maxlength: 30,
          },
          tax_region: {
            type: String,
            maxlength: 2,
          },
          tax_number: {
            type: String,
            maxlength: 9,
          },
          contact_email: {
            type: String,
            maxlength: 50,
          },
          send_invoices: {
            type: Boolean,
          },
        },

        // PAYMENT
        // How was this transaction paid, the amounts involved
        // and the associated tax details.
        payment: {
          is_paid: {
            type: Boolean,
          },
          method_value: {
            type: String,
            maxlength: 30,
          },
          method_label: {
            type: String,
            maxlength: 30,
          },
          amount_subtotal: {
            type: Number,
          },
          amount_discounts: {
            type: Number,
          },
          amount_total: {
            type: Number,
          },
        },

        // CHECKING ACCOUNT (Optional)
        // The checking account associated with this transaction.
        // In this mode, it is frequent the transaction is unpaid
        checking_account: {
          _id: {
            type: String,
            maxlength: 30,
          },
          title: {
            type: String,
            maxlength: 30,
          },
          client_name: {
            type: String,
            maxlength: 30,
          },
          tax_region: {
            type: String,
            maxlength: 2,
          },
          tax_number: {
            type: String,
            maxlength: 9,
          },
        },

        // INVOICE (Optional)
        // The invoice details generated by Vendus.
        // This is optional because transactions paid by checking_account
        // are not invoiced immediately but monthly, usually.
        invoice: {
          invoice_id: {
            type: String,
            maxlength: 30,
          },
          type: {
            type: String,
            maxlength: 30,
          },
          number: {
            type: String,
            maxlength: 30,
          },
          date: {
            type: String,
            maxlength: 30,
          },
          system_time: {
            type: String,
            maxlength: 30,
          },
          local_time: {
            type: String,
            maxlength: 30,
          },
          amount_gross: {
            type: String,
            maxlength: 30,
          },
          amount_net: {
            type: String,
            maxlength: 30,
          },
          hash: {
            type: String,
            maxlength: 30,
          },
        },
      },
      { timestamps: true }
    )
  );
