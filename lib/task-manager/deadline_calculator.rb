module TaskManager
  module DeadlineCalculator
    def calculate_deadline(type, opts)
      type = convert_type(type)
      opts.symbolize_keys!

      beginning = Time.now.send("beginning_of_#{type}")
      beginning.
        months_since(opts[:deadline_month].to_i).
        since(opts[:deadline_day].to_i * 24 * 60 * 60).
        since(opts[:deadline_hour].to_i * 60 * 60).
        since(opts[:deadline_minute].to_i * 60)
    end

    private
    def convert_type(type)
      return :day if type.to_sym == :daily

      type.to_s.gsub(/ly/, '').to_sym
    end
  end
end
