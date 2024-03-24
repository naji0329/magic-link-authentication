use anchor_lang::prelude::*;

declare_id!("Dnf8D1JQ4CY5nW146XpDo7DJ7kHvfAtL68V9cdMy7M15");

#[program]
pub mod my_check_in_project {
    use super::*;

    pub fn check_in(ctx: Context<CheckIn>) -> Result<()> {
        // Get the new created PDA
        let check_in_account = &mut ctx.accounts.check_in_account;
        check_in_account.last_check_in = Clock::get()?.unix_timestamp;
        Ok(())
    }

    pub fn get_check_in(ctx: Context<GetCheckIn>) -> Result<i64> {
        let check_in_account = &ctx.accounts.check_in_account;
        Ok(check_in_account.last_check_in)
    }
}

#[account]
pub struct CheckInAccount {
    pub last_check_in: i64,
}

#[derive(Accounts)]
pub struct CheckIn<'info> {
    // Create a new account with the PDA
    #[account(init_if_needed, payer = user, space = 8 + 8)]
    pub check_in_account: Account<'info, CheckInAccount>,
    // Check the user is signer
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct GetCheckIn<'info> {
    #[account()]
    pub check_in_account: Account<'info, CheckInAccount>,
}
