'use strict';

module.exports = class WOS {
  constructor() {
    this.data = {};
  }

  base() {
    return {
      stagedAt: new Date(),
      createdAt: new Date(),
      cancel_dt: false,
      lastTouchTime: new Date(),
      officeDetails: {
        salesRep: 0,
        resId: 0,
        resName: '',
        resPhone: '',
      },
      customerDetails: {
        acct: 0,
        member: 0,
        customerName: '',
        address: {
          streetAddr: '',
          addrNote: '',
          city: '',
          state: '',
          zip: '',
          geo: [],
        },
        phone: '',
        altPhone: '',
        billingEntity: {
          payername: '',
          payerId: '',
          payerType: '',
        },
      },
      orderDetails: {
        sched_dt: new Date(0),
        req_dt: new Date(0),
        method_id: 0,
        driverId: 0,
        locationId: 0,
        region: '',
        orderNotes: '',
        statusNote: '',
        timeBlock: {
          start: new Date(0),
          end: new Date(0),
        },
      },
      lines: [],
      log: [
        {
          action: 'created',
          ts: new Date(),
        },
      ],
      qualia: {
        Category: '',
        type: '',
      },
    };
  }

  async changeState(params) {
    this.data.lastTouchTime = new Date();
    let logEntry = {
      action: 'state change',
      ts: new Date(),
      u_id: params.user._id,
      userName: params.user.userName,
      from: this.data.state,
      to: newState,
    };
    this.state.log.push(logEntry);
    this.data.state = newState;
  }
};
