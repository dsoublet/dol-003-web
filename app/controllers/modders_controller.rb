class ModdersController < ApplicationController

  def index
    services = params[:services] || []
    @services = services.select { |service| ModderService::ALL_SERVICES.include? service.to_sym }
  end

  def show
    @modder = Modder.find_by(slug: params[:id]) or not_found
  end

end
