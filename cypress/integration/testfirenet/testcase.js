describe('My First Test', function() {
  it('clicks the link "type"', function() {
    cy.visit('http://testfire.net/login.jsp')
    cy.get('#uid').type('jsmith')
    cy.get('#passw').type('demo1234')
    cy.get('input[name*=btnSubmit]').click()
    cy.screenshot('test/mainpage')
    cy.get('#btnGetAccount').click()
    cy.screenshot('test/accountOverview')
    })
})