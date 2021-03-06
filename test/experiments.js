/**
 * Copyright (C) 2019 Alexei Zamyatin and Dominik Harz
 * 
 * This file is part of XCLAIM.
 * 
 * XCLAIM is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * XCLAIM is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with XCLAIM.  If not, see <http://www.gnu.org/licenses/>.
 */

var helpers = require('./helpers');
var convertToUsd = helpers.convertToUsd;

// Writing experiments data to CSV
var fs = require("fs");
var csvWriter = require('csv-write-stream');
var writer = csvWriter();

// experiment related vars
var issue_success_col_gas = 0;
var issue_fail_col_gas = 0;
var issue_success_htlc_gas = 0;
var issue_fail_htlc_gas = 0;
var trade_success_gas = 0;
var trade_fail_gas = 0;
var transfer_success_gas = 0;
var redeem_success_gas = 0;
var redeem_fail_gas = 0;
var replace_success_gas = 0;
var replace_fail_gas = 0;

var issue_success_col_txs = 0;
var issue_fail_col_txs = 0;
var issue_success_htlc_txs = 0;
var issue_fail_htlc_txs = 0;
var trade_success_txs = 0;
var trade_fail_txs = 0;
var transfer_success_txs = 0;
var redeem_success_txs = 0;
var redeem_fail_txs = 0;
var replace_success_txs = 0;
var replace_fail_txs = 0;

contract('Tx and Gas measurements', async (accounts) => {

    before('Create writer for experiments', async () => {
        // writer.pipe(fs.createWriteStream(('./experiments/Gas_ERCXXX_BTCRelay.csv')));
    })

    after('Write experiment data to file', async () => {
        let issue_success_col_usd = convertToUsd(issue_success_col_gas);
        let issue_fail_col_usd = convertToUsd(issue_fail_col_gas);
        let issue_success_htlc_usd = convertToUsd(issue_success_htlc_gas);
        let issue_fail_htlc_usd = convertToUsd(issue_fail_htlc_gas);
        let trade_success_usd = convertToUsd(trade_success_gas);
        let trade_fail_usd = convertToUsd(trade_fail_gas);
        let transfer_success_usd = convertToUsd(transfer_success_gas);
        let redeem_success_usd = convertToUsd(redeem_success_gas);
        let redeem_fail_usd = convertToUsd(redeem_fail_gas);
        let replace_success_usd = convertToUsd(replace_success_gas);
        let replace_fail_usd = convertToUsd(replace_fail_gas);

        writer.write({
            confirmIssueSuccess: issue_success_col_gas,
            confirmIssueFail: issue_fail_col_gas,
            IssueHTLCSuccesss: issue_success_htlc_gas,
            IssueHTLCFail: issue_fail_htlc_gas,
            Transfer: transfer_success_gas,
            TradeSuccess: trade_success_gas,
            TradeFail: trade_fail_gas,
            RedeemSuccess: redeem_success_gas,
            RedeemFail: redeem_fail_gas,
            ReplaceSuccess: replace_success_gas,
            ReplaceFail: replace_fail_gas
        });
        writer.write({
            confirmIssueSuccess: issue_success_col_usd,
            confirmIssueFail: issue_fail_col_usd,
            IssueHTLCSuccesss: issue_success_htlc_usd,
            IssueHTLCFail: issue_fail_htlc_usd,
            Transfer: transfer_success_usd,
            TradeSuccess: trade_success_usd,
            TradeFail: trade_fail_usd,
            RedeemSuccess: redeem_success_usd,
            RedeemFail: redeem_fail_usd,
            ReplaceSuccess: replace_success_usd,
            ReplaceFail: replace_fail_usd
        });
        writer.write({
            confirmIssueSuccess: issue_success_col_txs,
            confirmIssueFail: issue_fail_col_txs,
            IssueHTLCSuccesss: issue_success_htlc_txs,
            IssueHTLCFail: issue_fail_htlc_txs,
            Transfer: transfer_success_txs,
            TradeSuccess: trade_success_txs,
            TradeFail: trade_fail_txs,
            RedeemSuccess: redeem_success_txs,
            RedeemFail: redeem_fail_txs,
            ReplaceSuccess: replace_success_txs,
            ReplaceFail: replace_fail_txs
        });
        writer.end();
    })

})